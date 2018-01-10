import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    puchasable: false,
    purchasing: false,
    loading: false
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => {
        return sum + el; 
      }, 0);
    this.setState({puchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const ingredients = {...this.state.ingredients};
    ingredients[type]++;
    const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ ingredients, totalPrice });
    this.updatePurchaseState(ingredients);
  }

  removeIngredientHandler = (type) => {
    const ingredients = {...this.state.ingredients};
    if (ingredients[type] <= 0) return;
    ingredients[type]--;
    const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ ingredients, totalPrice });
    this.updatePurchaseState(ingredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients : this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Travis Shields',
        address: {
          street: '100 Jay Street',
          zipCode: '11201',
          country: 'USA'
        },
        email: 'travis.shields@gmail.com'
      },
      delieveryMethod: 'fastest'
    };
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls  
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          puchasable={this.state.puchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice} />
      </Aux>
    );
  }
}

export default BurgerBuilder;