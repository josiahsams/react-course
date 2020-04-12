import * as ActionTypes from "./ActionTypes";
import { DISHES } from "../shared/dishes";
import { baseUrl } from "../shared/baseURL";

export const addComment = (comment) => {
  console.log("Invoked addComment");
  return {
    type: ActionTypes.ADD_COMMENT,
    payload: comment,
  };
};

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  };

  newComment.date = new Date().toISOString();

  return fetch(baseUrl + "comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + "  " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var err = new Error(error.message);
        console.log(error.message);

        throw err;
      }
    )
    .then((response) => response.json())
    .then((comment) => dispatch(addComment(comment)))
    .catch((err) => console.log("Post Comments : ", err.message));
};

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseUrl + "dishes")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + "  " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var err = new Error(error.message);
        console.log(error.message);

        throw err;
      }
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((err) => dispatch(dishesFailed(err.message)));

  // setTimeout(() => {
  //   dispatch(addDishes(DISHES));
  // }, 2000);
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errors) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errors,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + "  " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var err = new Error(error.message);
        console.log(error.message);

        throw err;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((err) => dispatch(commentsFailed(err.message)));
};

export const commentsFailed = (errors) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errors,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});
