import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    {controls.map(item => (
      <BuildControl 
        key={item.label}
        label={item.label}
        addIngredient={() => props.addIngredient(item.type)}
        removeIngredient={() => props.removeIngredient(item.type)}
        disabled={props.disabled[item.type]} />
    ))}
  </div>
);

export default buildControls;