import React, { useState, useEffect } from "react";

import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Contact from "./ContactComponent";
import { connect, createDispatchHook } from "react-redux";
import {
  postComment,
  fetchDishes,
  fetchComments,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  resetFeedBackForm: () => {
    dispatch(actions.reset("feedback"));
  },
});

function Main(props) {
  //   const [dishes] = useState(DISHES);
  //   const [comments] = useState(COMMENTS);
  //   const [promotions] = useState(PROMOTIONS);
  //   const [leaders] = useState(LEADERS);

  // componentDidMount()
  useEffect(() => {
    props.fetchDishes();
    props.fetchComments();
  }, []);
  //   props.fetchDishes();
  const HomePage = () => {
    return (
      <Home
        dish={props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={props.dishes.isLoading}
        dishesErrors={props.dishes.errors}
        promotion={props.promotions.filter((promo) => promo.featured)[0]}
        leader={props.leaders.filter((leader) => leader.featured)[0]}
      />
    );
  };

  const DishWithId = ({ match }) => {
    return (
      <DishDetail
        comments={props.comments.comments.filter(
          (dish) => dish.dishId === parseInt(match.params.dishId, 10)
        )}
        isLoading={props.dishes.isLoading}
        errors={props.dishes.errors}
        postComment={props.postComment}
        commentsErrors={props.comments.comments.errors}
        dish={props.dishes.dishes.find(
          (dish) => dish.id === parseInt(match.params.dishId, 10)
        )}
      />
    );
  };

  return (
    <div>
      <Header />
      <TransitionGroup>
        {/* Every component recieves 3 match, location, history  */}
        <CSSTransition key={props.location.key} classNames="page" timeout={300}>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route
              exact
              path="/menu"
              component={() => <Menu dishes={props.dishes} />}
            />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route
              path="/contactus"
              component={() => (
                <Contact resetFeedBackForm={props.resetFeedBackForm} />
              )}
            />
            <Redirect to="/home" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
