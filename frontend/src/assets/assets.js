// assets.js

import about_img from "./about_img.png";
import hero_img from "./hero_img.png";
import contact_img from "./contact_img.png";
import logo from "./feed_me_logo.png";
import razorpay_logo from "./razorpay_logo.png";
import stripe_logo from "./stripe_logo.png";

// UI Icons
import bin_icon from "./bin_icon.png";
import cart_icon from "./cart_icon.png";
import cross_icon from "./cross_icon.png";
import dropdown_icon from "./dropdown_icon.png";
import exchange_icon from "./exchange_icon.png";
import menu_icon from "./menu_icon.png";
import profile_icon from "./profile_icon.png";
import quality_icon from "./quality_icon.png";
import search_icon from "./search_icon.png";
import star_icon from "./star_icon.png";
import star_dull_icon from "./star_dull_icon.png";
import support_img from "./support_img.png";


// Food Images
import aperol_cocktail from "./aperol_cocktail.png";
import aperol_cocktail_close from "./aperol_cocktail_close.png";
import bacon from "./bacon.png";
import bbq_chicken from "./bbq_chicken.png";
import blt from "./blt.png";
import boba_tea from "./boba_tea.png";
import brisket from "./brisket.png";
import buffalo_wings from "./buffalo_wings.png";
import buffalo_wings_cocktail from "./buffalo_wings_cocktail.png";
import butternut_squash_risotto from "./butternut_squash_risotto.png";

import charcuterie_board from "./charcuterie_board.png";
import charcuterie_board_closeup from "./charcuterie_board_closeup.png";
import charcuterie_board_wine from "./charcuterie_board_wine.png";
import charcuterie_board_wine_filter from "./charcuterie_board_wine_filter.png";
import charcuterie_board_wine_night from "./charcuterie_board_wine_night.png";

import chicken_noodle_soup from "./chicken_noodle_soup.png";
import chicken_noodle_soup_ingredients from "./chicken_noodle_soup_ingredients.png";

import chocolate_chip_cookies from "./chocolate_chip_cookies.png";
import cinnabun from "./cinnabun.png";
import cinnabun_2 from "./cinnabun_2.png";
import classic_salad_feta from "./classic_salad_feta.png";

import congee_eggs from "./congee_eggs.png";
import congee_steak from "./congee_steak.png";
import congee_steak_eggs from "./congee_steak_eggs.png";

import creme_brulee from "./creme_brulee.png";
import creme_brulee_before_cook from "./creme_brulee_before_cook.png";
import creme_brulee_close from "./creme_brulee_close.png";
import creme_brulee_done from "./creme_brulee_done.png";
import creme_brulee_fire from "./creme_brulee_fire.png";
import creme_brulee_fire_2 from "./creme_brulee_fire_2.png";
import creme_brulee_fire_3 from "./creme_brulee_fire_3.png";

import fettuccini_shrimp from "./fettuccini_shrimp.png";
import fried_chicken_sandwich from "./fried_chicken_sandwich.png";
import fried_chicken_sandwich_2 from "./fried_chicken_sandwich_2.png";
import homemade_pasta from "./homemade_pasta.png";
import hot_chocolate from "./hot_chocolate.png";
import instant_ramen_with_eggs from "./instant_ramen_with_eggs.png";
import lotus_cookies from "./lotus_cookies.png";

import mashed_potatoes from "./mashed_potatoes.png";
import matzah_ball_soup from "./matzah_ball_soup.png";
import matzah_balls from "./matzah_balls.png";
import meatballs from "./meatballs.png";
import meatball_pizza from "./meatball_pizza.png";
import mushroom_soup from "./mushroom_soup.png";

import pancakes from "./pancakes.png";
import pancakes_close from "./pancakes_close.png";
import pasta_with_rose_sauce from "./pasta_with_rose_sauce.png";

import pizza_bechamel from "./pizza_bechamel.png";
import pizza_carbonara from "./pizza_carbonara.png";
import pizza_marinara from "./pizza_marinara.png";
import pizza_pepperoni from "./pizza_pepperoni.png";

import potato_dauphinoise from "./potato_dauphinoise.png";
import potato_gratin from "./potato_gratin.png";

import rainbow_cake_frosting from "./rainbow_cake_frosting.png";
import rainbow_cake_no_frosting from "./rainbow_cake_no_frosting.png";
import rainbow_cake_with_frosting from "./rainbow_cake_with_frosting.png";

import shell_pasta from "./shell_pasta.png";
import spaghetti_pasta from "./spaghetti_pasta.png";
import steak_sandwich from "./steak_sandwich.png";

import stuffed_french_toast_pre from "./stuffed_french_toast_pre.png";
import stuffed_french_toast from "./stuffed_french_toast.png";
import stuffed_french_toast_done from "./stuffed_french_toast_done.png";
import sushi from "./sushi.png";
import steak from "./steak.png";
import steaks from "./steaks.png";
import steak_with_fat from "./steak_with_fat.png";
import steaks_on_cutting_board from "./steaks_on_cutting_board.png";
import steak_slices from "./steak_slices.png";
import pickles from "./pickles.png";
import wine_fruit from "./wine_fruit.png";
import wing_shaped_pasta_with_sauce_close from "./wing_shaped_pasta_with_sauce_close.png";
import wing_shaped_pasta_with_tomato_sauce from "./wing_shaped_pasta_with_tomato_sauce.png";

import berries from "./berries.png";
import blackberries from "./blackberries.png";



export const assets = {
  logo,
  hero_img,
  about_img,
  contact_img,
  razorpay_logo,
  bin_icon,
  cart_icon,
  cross_icon,
  dropdown_icon,
  exchange_icon,
  menu_icon,
  profile_icon,
  quality_icon,
  search_icon,
  star_icon,
  star_dull_icon,
  support_img,
  stripe_logo
};

export const products = [
  {
    _id: "aperol-cocktail",
    name: "Aperol Cocktail",
    description: "A refreshing Aperol cocktail with citrus and sparkling notes, perfect as a pre-dinner drink.",
    price: 8,
    timeToPrepare: 3,
    image: [aperol_cocktail, aperol_cocktail_close],
    category: ["Breakfast", "Lunch", "Dinner"],
    subCategory: ["Cocktail", "Beverage"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: false,
  },
  {
    _id: "charcuterie-board",
    name: "Charcuterie Board",
    description: "A generous assortment of cured meats, cheeses, and accompaniments designed for sharing.",
    price: 30,
    timeToPrepare: 8,
    image: [
      charcuterie_board,
      charcuterie_board_closeup,
      charcuterie_board_wine,
      charcuterie_board_wine_filter,
      charcuterie_board_wine_night,
    ],
    category: ["Snack"],
    subCategory: ["Healthy", "Appetizer"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: false,
  },
  {
    _id: "chicken-noodle-soup",
    name: "Chicken Noodle Soup",
    description: "Classic homemade chicken noodle soup with vegetables and tender chicken.",
    price: 40,
    timeToPrepare: 240,
    image: [chicken_noodle_soup, chicken_noodle_soup_ingredients],
    category: ["Lunch"],
    subCategory: ["Healthy", "Soup", "Main"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: true,
  },
  {
    _id: "matzah-ball-soup",
    name: "Matzah Ball Soup",
    description: "Traditional matzah ball soup simmered in rich chicken broth.",
    price: 16,
    timeToPrepare: 120,
    image: [matzah_ball_soup, matzah_balls],
    category: ["Lunch"],
    subCategory: ["Healthy", "Soup", "Main"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: true,
  },
  {
    _id: "meatballs",
    name: "Meatballs",
    description: "Juicy, herb-seasoned meatballs prepared from scratch and ready to cook or bake.",
    price: 18,
    timeToPrepare: 90,
    image: [meatballs],
    category: ["Dinner"],
    subCategory: ["Baked"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: true,
  },
  {
    _id: "meatball-pizza",
    name: "Meatball Pizza",
    description: "Baked pizza topped with tomato sauce, melted cheese, and homemade meatballs.",
    price: 20,
    timeToPrepare: 30,
    image: [meatball_pizza],
    category: ["Dinner"],
    subCategory: ["Baked", "Main"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: true,
  },
  {
    _id: "marinara-pizza",
    name: "Marinara Pizza",
    description: "Traditional Neapolitan-style marinara pizza with tomato, garlic, olive oil, and herbs.",
    price: 14,
    timeToPrepare: 25,
    image: [pizza_marinara],
    category: ["Dinner"],
    subCategory: ["Baked", "Main"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: true,
  },
  {
    _id: "pepperoni-pizza",
    name: "Pepperoni Pizza",
    description: "Classic pepperoni pizza with a crisp crust and melted cheese.",
    price: 18,
    timeToPrepare: 25,
    image: [pizza_pepperoni],
    category: ["Dinner"],
    subCategory: ["Baked", "Main"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: true,
    additionalPrepTime: true,
  },
  {
    _id: "carbonara-pizza",
    name: "Carbonara Pizza",
    description: "White pizza inspired by carbonara with cheese and cured meat.",
    price: 22,
    timeToPrepare: 30,
    image: [pizza_carbonara],
    category: ["Dinner"],
    subCategory: ["Baked", "Main"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: true,
  },
  {
    _id: "pizza-bechamel",
    name: "Béchamel Pizza",
    description: "White pizza base layered with béchamel sauce and cheese, baked until golden.",
    price: 20,
    timeToPrepare: 30,
    image: [pizza_bechamel],
    category: ["Dinner"],
    subCategory: ["Baked", "Main"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: true,
  },
  {
    _id: "potato-dauphinoise",
    name: "Potato Dauphinoise",
    description: "Creamy layered potatoes baked slowly with cream and cheese until tender and golden.",
    price: 16,
    timeToPrepare: 120,
    image: [potato_dauphinoise],
    category: ["Dinner"],
    subCategory: ["Baked"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: true,
    additionalPrepTime: true,
  },
  {
    _id: "potato-gratin",
    name: "Potato Gratin",
    description: "Cheesy potato gratin with crisp top and soft, rich interior.",
    price: 15,
    timeToPrepare: 90,
    image: [potato_gratin],
    category: ["Dinner"],
    subCategory: ["Baked"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: true,
  },
  {
    _id: "pancakes",
    name: "Fluffy Pancakes",
    description: "Soft, fluffy pancakes ideal for a comforting breakfast.",
    price: 10,
    timeToPrepare: 30,
    image: [pancakes, pancakes_close],
    category: ["Breakfast"],
    subCategory: ["Dessert", "Sweet"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: true,
    additionalPrepTime: false,
  },
  {
    _id: "rainbow-cake",
    name: "Rainbow Cake",
    description: "Moist vanilla cake with colorful sprinkles, with or without frosting.",
    price: 24,
    timeToPrepare: 40,
    image: [
      rainbow_cake_no_frosting,
      rainbow_cake_with_frosting,
      rainbow_cake_frosting,
    ],
    category: ["Snack"],
    subCategory: ["Dessert", "Sweet", "Baked"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: true,
    additionalPrepTime: false,
  },
  {
    _id: "steak-sandwich",
    name: "Steak Sandwich",
    description: "Open-faced sandwich with medium-rare steak, caramelized onions, and creamy spread.",
    price: 22,
    timeToPrepare: 60,
    image: [steak_sandwich],
    category: ["Lunch"],
    subCategory: ["Healthy", "Main", "Grilled"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: true,
  },
  {
    _id: "bbq-chicken",
    name: "BBQ Chicken",
    description: "Oven-roasted chicken glazed with smoky barbecue sauce and caramelized edges.",
    price: 20,
    timeToPrepare: 45,
    image: [bbq_chicken],
    category: ["Dinner"],
    subCategory: ["Baked", "Main"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: false,
  },
  {
    _id: "crispy-bacon",
    name: "Crispy Bacon",
    description: "Pan-fried bacon strips cooked until crisp and golden.",
    price: 60,
    timeToPrepare: 15,
    image: [bacon],
    category: ["Breakfast"],
    subCategory: ["Fried"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: false,
  },
  {
    _id: "mixed-berries",
    name: "Mixed Berries",
    description: "Fresh assortment of berries including strawberries and blueberries.",
    price: 10,
    timeToPrepare: 5,
    image: [berries],
    category: ["Breakfast", "Snack"],
    subCategory: ["Healthy", "Dessert"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: false,
  },
  {
    _id: "blackberries",
    name: "Blackberries",
    description: "Fresh ripe blackberries, lightly washed and ready to serve.",
    price: 9,
    timeToPrepare: 5,
    image: [blackberries],
    category: ["Breakfast", "Snack"],
    subCategory: ["Healthy", "Dessert"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: false,
  },
  {
    _id: "blt-sandwich",
    name: "BLT Sandwich",
    description: "Classic bacon, lettuce, and tomato sandwich on toasted bread.",
    price: 14,
    timeToPrepare: 20,
    image: [blt],
    category: ["Lunch"],
    subCategory: ["Healthy"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: true,
    additionalPrepTime: false,
  },
  {
    _id: "boba-tea",
    name: "Boba Tea",
    description: "Chilled milk tea served with chewy tapioca pearls.",
    price: 7,
    timeToPrepare: 90,
    image: [boba_tea],
    category: ["Snack"],
    subCategory: ["Dessert", "Beverage"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: true,
    additionalPrepTime: true,
  },
  {
    _id: "buffalo-wings",
    name: "Buffalo Wings",
    description: "Crispy chicken wings tossed in spicy buffalo sauce.",
    price: 16,
    timeToPrepare: 30,
    image: [buffalo_wings, buffalo_wings_cocktail],
    category: ["Dinner"],
    subCategory: ["Fried", "Appetizer"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: true,
    additionalPrepTime: false,
  },
  {
    _id: "slow-cooked-brisket",
    name: "Slow Cooked Brisket",
    description: "Tender beef brisket slow-cooked until juicy and flavorful.",
    price: 500,
    timeToPrepare: 480,
    image: [brisket],
    category: ["Dinner"],
    subCategory: ["Baked", "Main"],
    servings: ["8"],
    date: Date.now(),
    bestseller: true,
    additionalPrepTime: true,
  },
  {
    _id: "butternut-squash-risotto",
    name: "Butternut Squash Risotto",
    description: "Creamy risotto cooked with roasted butternut squash and parmesan.",
    price: 40,
    timeToPrepare: 90,
    image: [butternut_squash_risotto],
    category: ["Dinner"],
    subCategory: ["Healthy", "Main"],
    servings: ["4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: true,
  },
  {
    _id: "cinnamon-buns",
    name: "Cinnamon Buns",
    description: "Soft baked cinnamon rolls with a golden crust and spiced filling.",
    price: 14,
    timeToPrepare: 90,
    image: [cinnabun, cinnabun_2],
    category: ["Breakfast", "Snack"],
    subCategory: ["Dessert", "Sweet", "Baked"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: true,
    additionalPrepTime: true,
  },
  {
    _id: "classic-feta-salad",
    name: "Classic Feta Salad",
    description: "Fresh vegetable salad topped with feta cheese and olive oil.",
    price: 12,
    timeToPrepare: 45,
    image: [classic_salad_feta],
    category: ["Breakfast", "Lunch"],
    subCategory: ["Healthy", "Salad"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: true,
  },
  {
    _id: "chocolate-chip-cookies",
    name: "Chocolate Chip Cookies",
    description: "Soft baked cookies loaded with melted chocolate chips.",
    price: 10,
    timeToPrepare: 90,
    image: [chocolate_chip_cookies],
    category: ["Snack"],
    subCategory: ["Dessert", "Sweet", "Baked"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: true,
    additionalPrepTime: false,
  }, 
  {
    _id: "fettuccini-shrimp",
    name: "Shrimp Fettuccini",
    description: "Creamy fettuccini pasta served with sautéed shrimp.",
    price: 22,
    timeToPrepare: 80,
    image: [fettuccini_shrimp],
    category: ["Dinner"],
    subCategory: ["Healthy", "Main"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: false,
  },
  {
    _id: "fried-chicken-sandwich",
    name: "Fried Chicken Sandwich",
    description: "Crispy fried chicken breast served in a toasted bun.",
    price: 16,
    timeToPrepare: 90,
    image: [fried_chicken_sandwich, fried_chicken_sandwich_2],
    category: ["Lunch", "Dinner"],
    subCategory: ["Fried", "Main"],
    servings: ["6", "8", "10"],
    date: Date.now(),
    bestseller: true,
    additionalPrepTime: true,
  },
  {
    _id: "hot-chocolate",
    name: "Hot Chocolate",
    description: "Warm and rich chocolate drink topped with foam.",
    price: 40,
    timeToPrepare: 60,
    image: [hot_chocolate],
    category: ["Breakfast"],
    subCategory: ["Dessert", "Sweet"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: false,
  },
  {
    _id: "instant-ramen-eggs",
    name: "Instant Ramen with Eggs",
    description: "Comfort ramen noodles served with soft-cooked eggs.",
    price: 8,
    timeToPrepare: 10,
    image: [instant_ramen_with_eggs],
    category: ["Lunch"],
    subCategory: ["Healthy"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: false,
  },
  {
    _id: "lotus-cookies",
    name: "Lotus Cookies",
    description: "Spiced caramelized biscuits with a crunchy texture.",
    price: 9,
    timeToPrepare: 60,
    image: [lotus_cookies],
    category: ["Snack"],
    subCategory: ["Dessert", "Sweet", "Baked"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: false,
  },
  {
    _id: "mushroom-soup",
    name: "Mushroom Soup",
    description: "Smooth and earthy mushroom soup served warm.",
    price: 50,
    timeToPrepare: 90,
    image: [mushroom_soup],
    category: ["Lunch"],
    subCategory: ["Healthy", "Soup"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: false,
  },
  {
    _id: "mashed-potatoes",
    name: "Mashed Potatoes",
    description: "Creamy mashed potatoes whipped with butter and seasoning.",
    price: 10,
    timeToPrepare: 60,
    image: [mashed_potatoes],
    category: ["Dinner"],
    subCategory: ["Healthy"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: false,
  },
  {
    _id: "pickles",
    name: "House Pickles",
    description: "Crunchy homemade pickles with a tangy brine.",
    price: 6,
    timeToPrepare: 5,
    image: [pickles],
    category: ["Snack"],
    subCategory: ["Healthy", "Appetizer"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: true,
  },
  // {
  //   _id: "plain-congee",
  //   name: "Plain Congee",
  //   description: "Slow-cooked rice porridge with a smooth, comforting texture.",
  //   price: 8,
  //   timeToPrepare: 120,
  //   image: congee,
  //   category: "Breakfast",
  //   subCategory: "healthy",
  //   servings: ["2", "4", "6", "8", "10"],
  //   date: Date.now(),
  //   bestseller: false,
  //   additionalPrepTime: false,
  // },
  {
    _id: "congee-with-eggs",
    name: "Congee with Eggs",
    description: "Classic congee topped with soft-cooked eggs.",
    price: 10,
    timeToPrepare: 120,
    image: [congee_eggs],
    category: ["Breakfast"],
    subCategory: ["Healthy", "Appetizer"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: false,
  },
  {
    _id: "congee-with-steak",
    name: "Congee with Steak",
    description: "Warm rice congee served with tender sliced steak.",
    price: 20,
    timeToPrepare: 120,
    image: [congee_steak],
    category: ["Lunch", "Dinner"],
    subCategory: ["Healthy", "Main", "Grilled"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: false,
  },
  {
    _id: "congee-with-steak-eggs",
    name: "Congee with Steak and Eggs",
    description: "Hearty congee topped with steak slices and soft eggs.",
    price: 80,
    timeToPrepare: 120,
    image: [congee_steak_eggs],
    category: ["Lunch", "Dinner"],
    subCategory: ["Healthy", "Main", "Grilled"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: true,
    additionalPrepTime: false,
  },
  {
    _id: "creme-brulee",
    name: "Crème Brûlée",
    description: "Classic vanilla custard with a caramelized sugar crust.",
    price: 12,
    timeToPrepare: 90,
    image: [creme_brulee, creme_brulee_before_cook, creme_brulee_close, creme_brulee_done, creme_brulee_fire, creme_brulee_fire_2, creme_brulee_fire_3],
    category: ["Snack"],
    subCategory: ["Dessert", "Sweet"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: true,
    additionalPrepTime: true,
  },
  {
    _id: "homemade-pasta",
    name: "Homemade Pasta",
    description: "Freshly made pasta with a delicate, tender bite.",
    price: 14,
    timeToPrepare: 120,
    image: [homemade_pasta],
    category: ["Lunch", "Dinner"],
    subCategory: ["Main"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: true,
  },
  {
    _id: "pasta-rose-sauce",
    name: "Pasta with Rosé Sauce",
    description: "Creamy tomato-cream rosé sauce tossed with pasta.",
    price: 18,
    timeToPrepare: 30,
    image: [pasta_with_rose_sauce, wing_shaped_pasta_with_sauce_close, wing_shaped_pasta_with_tomato_sauce],
    category: ["Lunch", "Dinner"],
    subCategory: ["Main"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: true,
    additionalPrepTime: false,
  },
  {
    _id: "shell-pasta",
    name: "Shell Pasta",
    description: "Shell-shaped pasta cooked al dente, perfect for holding sauce.",
    price: 12,
    timeToPrepare: 15,
    image: [shell_pasta],
    category: ["Lunch", "Dinner"],
    subCategory: ["Main"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: false,
  },
  {
    _id: "spaghetti-pasta",
    name: "Spaghetti Pasta",
    description: "Classic spaghetti pasta cooked until perfectly al dente.",
    price: 12,
    timeToPrepare: 15,
    image: [spaghetti_pasta],
    category: ["Lunch", "Dinner"],
    subCategory: ["Main"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: false,
  },
  {
    _id: "pan-seared-steak",
    name: "Pan-Seared Steak",
    description: "Juicy pan-seared steak cooked to medium-rare, rested and sliced, finished with rendered beef fat and aromatics.",
    price: 120,
    timeToPrepare: 20,
    image: [
        steak,
        steaks,
        steak_with_fat,
        steaks_on_cutting_board,
        steak_slices,
    ],
    category: ["Lunch", "Dinner"],
    subCategory: ["Main", "Grilled"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: true,
    additionalPrepTime: true,
  },
  {
    _id: "stuffed-french-toast",
    name: "Stuffed French Toast",
    description: "Golden-brown stuffed French toast filled with a sweet, creamy, berry-center and pan-fried until crisp outside and soft inside.",
    price: 16,
    timeToPrepare: 45,
    image: [
        stuffed_french_toast_pre,
        stuffed_french_toast,
        stuffed_french_toast_done,
    ],
    category: ["Breakfast"],
    subCategory: ["Dessert", "Sweet"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: true,
    additionalPrepTime: false,
  },
  {
    _id: "mixed-sushi-rolls",
    name: "Mixed Sushi Rolls",
    description: "Assorted maki rolls filled with salmon, tuna, avocado, cucumber, and egg, wrapped in nori and seasoned rice.",
    price: 100,
    timeToPrepare: 90,
    image: [sushi],
    category: ["Lunch", "Dinner"],
    subCategory: ["Healthy", "Main"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: true,
    additionalPrepTime: true,
  },
  {
    _id: "white-wine-pomegranate",
    name: "White Wine with Fruit",
    description: "Chilled white wine served with fresh pomegranate seeds or an assortment ofberries for a lightly sweet, aromatic finish.",
    price: 10,
    timeToPrepare: 5,
    image: [wine_fruit],
    category: ["Lunch", "Dinner"],
    subCategory: ["Healthy", "Beverage"],
    servings: ["2", "4", "6", "8", "10"],
    date: Date.now(),
    bestseller: false,
    additionalPrepTime: false,
  }


];
