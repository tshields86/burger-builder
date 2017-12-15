import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    totalPrice: 4
  }

  addIngredientHandler = (type) => {
    const ingredients = {...this.state.ingredients};
    ingredients[type]++;
    const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ ingredients, totalPrice });
  }

  removeIngredientHandler = (type) => {
    const ingredients = {...this.state.ingredients};
    if (ingredients[type] <= 0) return;
    ingredients[type]--;
    const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ ingredients, totalPrice });
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls  
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo} />
      </Aux>
    );
  }
}

export default BurgerBuilder;