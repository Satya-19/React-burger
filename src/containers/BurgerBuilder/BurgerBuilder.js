import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/Build/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/Build/Order";
import axios from "../../axios.orders";
import withError from "../../components/Error/Error";
import Spinner from "../../components/UI/Spinner";
import * as actionTypes from "../../store/actions/index";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchase = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  purchase = () => {
    if (this.props.isAuthenticated) this.setState({ purchasing: true });
    else {
      this.props.onSetAuthRedirect("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancel = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinue = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const diableInfo = {
      ...this.props.ings,
    };
    for (let key in diableInfo) diableInfo[key] = diableInfo[key] <= 0;

    let orderSummary = null;

    let burger = this.props.error ? (
      <p style={{ textAlign: "center" }}>Check your internet connection</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={diableInfo}
            purchasable={this.updatePurchase(this.props.ings)}
            ordered={this.purchase}
            isAuth={this.props.isAuthenticated}
            price={this.props.price}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancel={this.purchaseCancel}
          purchaseContinue={this.purchaseContinue}
        />
      );
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(actionTypes.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actionTypes.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actionTypes.initIngredients()),
    onInitPurchase: () => dispatch(actionTypes.purchaseInit()),
    onSetAuthRedirect: (path) => dispatch(actionTypes.setAuthRedirect(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(BurgerBuilder, axios));
