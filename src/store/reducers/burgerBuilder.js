import * as actionTypes from "../actions/actionTypes";
import { uObject } from "../utility";

const iState = {
  ingredients: null,
  totalPrice: 5,
  error: false,
  building: false,
};

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.7,
  bacon: 0.7,
};

const reducer = (state = iState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const uIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      };
      const uIngredients = uObject(state.ingredients, uIngredient);
      const uState = {
        ingredients: uIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building: true,
      };
      return uObject(state, uState);

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
        building: true,
      };

    case actionTypes.SET_INGREDIENTS:
      return uObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        error: false,
        totalPrice: 5,
        building: false,
      });

    case actionTypes.FETCH_FAILED:
      return uObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;
