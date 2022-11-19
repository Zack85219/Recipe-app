require('dotenv').config;

export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
export const TIMEOUT_SEC = 10;
export const RES_PER_PAGE = 14;
export const FORKIFY_KEY = process.env.FORKIFY_KEY;
export const MODAL_CLOSE_SEC = 2.5;
export const SPOONACULAR =
  'https://api.spoonacular.com/recipes/visualizeNutrition';
export const SPOON_KEY = process.env.SPOON_KEY;
