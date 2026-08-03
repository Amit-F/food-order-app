# FeedMe

A meal-prep ordering app for two: one person (the **cook**) defines a catalog of
meals they can prepare; their partner (the **orderer**) browses it and orders
what they'd like made for the week. Placing an order lets the cook review it,
schedule a real Google Calendar event for the grocery run, check off an
aggregated shopping list generated from the order's ingredients, and schedule
a second event for actually cooking.

The data model is household-scoped throughout (`Household` → one cook +
one or more orderers), so a future version could let any cook run their own
household — but today it's built for exactly one.

## Stack

- **Backend**: Express 5, Mongoose/MongoDB, JWT auth, Cloudinary (meal photos),
  Google Calendar API via `googleapis`
- **Frontend**: React 19, Vite, Tailwind, React Router

## Setup

### 1. Backend environment

Create `backend/.env`:

```
MONGODB_URI=mongodb+srv://...           # MongoDB Atlas connection string (no db name suffix)
JWT_SECRET=...                          # any long random string
CLOUDINARY_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_SECRET_KEY=...
GOOGLE_CLIENT_ID=...                    # from a Google Cloud OAuth client (Web application)
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=http://localhost:4000/api/calendar/oauth-callback   # optional, this is the default
FRONTEND_URL=http://localhost:5173      # optional, this is the default
CALENDAR_TIMEZONE=Asia/Jerusalem        # optional, IANA timezone used for all calendar events
PORT=4000                               # optional
```

The Google OAuth client needs the Calendar API enabled, a consent screen
configured (Testing mode is fine for personal use — just add your own Google
account as a test user), and `http://localhost:4000/api/calendar/oauth-callback`
registered as an authorized redirect URI.

### 2. Frontend environment

Create `frontend/.env`:

```
VITE_BACKEND_URL=http://localhost:4000
```

### 3. Run

```bash
cd backend && npm install && npm run server   # nodemon, auto-reloads
cd frontend && npm install && npm run dev
```

Visit the frontend URL Vite prints. The database starts empty — the first
person to sign up should use the "Sign up as a cook" flow (no invite needed),
which creates a new Household. The cook can then generate an invite link
(profile menu → Invite) for their partner to join as an orderer.

## Key flows

- **Meals**: cook-only, added/edited via the "Add Meal" / "Edit Meal" pages —
  photos, category/type tags, valid serving sizes (always multiples of 2,
  since the cook is always batching for at least two people), and structured
  ingredients (stored **per single serving**, so the shopping list can scale
  and sum them correctly across orders).
- **Orders**: an orderer builds a draft in the cart, submits it, and it shows
  up in the cook's Review Orders queue.
- **Scheduling**: from Review Orders, the cook connects Google Calendar once,
  then schedules a shopping event, marks shopping done, schedules a cooking
  event, and marks that done — the order's status walks through
  `pending → shopping_scheduled → shopping_done → cook_scheduled → completed`.
- **Shopping list**: derived on the fly from every order that hasn't been
  shopped for yet (not a separately-maintained copy), aggregating ingredient
  quantities across meals and orders.

## Migrating an existing meal catalog

`backend/scripts/migrateMeals.js` is a one-time, idempotent script that seeds
Meal documents from `frontend/src/assets/assets.js`'s old static product data
(if present) into a cook's household, uploading each image to Cloudinary for
real. It leaves `ingredients` empty since that data doesn't exist in the old
format — add it afterward per-meal via Edit Meal.

```bash
cd backend
node --experimental-loader ./scripts/imageLoader.mjs scripts/migrateMeals.js <cook-email> [--limit=N]
```
