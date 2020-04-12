import * as ActionTypes from "./ActionTypes";

export const Dishes = (
  state = {
    isLoading: true,
    errors: null,
    dishes: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.DISHES_LOADING:
      console.log("DISHES_LOADINGinvoked");
      return { ...state, isLoading: true, errors: null, dishes: [] };
    case ActionTypes.ADD_DISHES:
      console.log("ADD _ DISHES invoked");

      return {
        ...state,
        isLoading: false,
        errors: null,
        dishes: action.payload,
      };

    case ActionTypes.DISHES_FAILED:
      return { ...state, isLoading: false, errors: action.payload, dishes: [] };
    default:
      return state;
  }
};
