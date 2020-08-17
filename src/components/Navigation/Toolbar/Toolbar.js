import React from 'react';
import Logo from '../../Logo/Logo';

import classes from './Toolbar.css';

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <Logo />
    <nav>
      ...
    </nav>
  </header>
);

export default Toolbar;