import { google } from "googleapis"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'
const SCOPES = ['https://www.googleapis.com/auth/calendar.events']

const newOAuthClient = () => new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI || 'http://localhost:4000/api/calendar/oauth-callback'
)


// Route: returns Google's consent URL as JSON (called via a normal authenticated
// XHR, not a browser navigation — a plain <a href> or window.location redirect
// can't carry an Authorization header). The frontend then does the actual
// browser redirect itself once it has the URL. The cook's id travels through
// as a signed `state` param since the OAuth callback that follows is a plain
// browser redirect with no Authorization header to read.
const connect = (req, res) => {

    const client = newOAuthClient()
    const state = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '10m' })

    const url = client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent', // forces Google to re-issue a refresh_token even on repeat connects
        scope: SCOPES,
        state
    })

    res.json({ success: true, url })

}


// Route: Google redirects here with ?code=&state= after the cook approves access.
const oauthCallback = async (req, res) => {

    try {

        const { code, state } = req.query
        const decoded = jwt.verify(state, process.env.JWT_SECRET)

        const client = newOAuthClient()
        const { tokens } = await client.getToken(code)

        const update = {
            'google.connected': true,
            'google.accessToken': tokens.access_token,
        }
        if (tokens.expiry_date) update['google.accessTokenExpiry'] = new Date(tokens.expiry_date)
        if (tokens.refresh_token) update['google.refreshToken'] = tokens.refresh_token

        await userModel.findByIdAndUpdate(decoded.userId, update)

        res.redirect(`${FRONTEND_URL}/calendar-connected`)

    } catch (error) {
        console.log(error)
        res.redirect(`${FRONTEND_URL}/calendar-connected?error=1`)
    }

}


// Route: whether the calling cook currently has Calendar connected.
const status = async (req, res) => {

    try {

        const cook = await userModel.findById(req.user.id)
        res.json({ success: true, connected: !!cook?.google?.connected })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// Builds a Google-authenticated client for a given cook, using their stored
// refresh token. Any newly-issued access/refresh tokens (Google rotates the
// access token automatically, and occasionally the refresh token too) are
// persisted back onto the cook's User doc via the client's 'tokens' event.
const getAuthorizedClientForCook = async (cookId) => {

    const cook = await userModel.findById(cookId).select('+google.refreshToken +google.accessToken')

    if (!cook?.google?.connected || !cook.google.refreshToken) {
        throw new Error('Connect Google Calendar before scheduling events')
    }

    const client = newOAuthClient()
    client.setCredentials({ refresh_token: cook.google.refreshToken })

    client.on('tokens', async (tokens) => {
        const update = {}
        if (tokens.access_token) update['google.accessToken'] = tokens.access_token
        if (tokens.expiry_date) update['google.accessTokenExpiry'] = new Date(tokens.expiry_date)
        if (tokens.refresh_token) update['google.refreshToken'] = tokens.refresh_token
        if (Object.keys(update).length > 0) {
            await userModel.findByIdAndUpdate(cookId, update)
        }
    })

    return client

}


// Creates a real Google Calendar event on the cook's primary calendar.
// Returns the created event's id (stored on the Order for later reference).
const createCalendarEvent = async (cookId, { summary, description, startDateTime, endDateTime, timeZone }) => {

    const client = await getAuthorizedClientForCook(cookId)
    const calendar = google.calendar({ version: 'v3', auth: client })

    const response = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: {
            summary,
            description,
            start: { dateTime: startDateTime, timeZone },
            end: { dateTime: endDateTime, timeZone }
        }
    })

    return response.data.id

}


export { connect, oauthCallback, status, createCalendarEvent }
