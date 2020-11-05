import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>Burger Builder</NavigationItem>
      {
        props.isAuthenticated && <NavigationItem link="/orders">Orders</NavigationItem>
      }
      { 
        !props.isAuthenticated
        ? <NavigationItem link="/auth">Authenticate</NavigationItem>
        : <NavigationItem link="/logout">Logout</NavigationItem>
      }
    </ul>
  )
};

export default NavigationItems;