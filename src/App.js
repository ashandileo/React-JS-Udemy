import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

// import Posts from './containers/Posts';
import User from './containers/User';
import Welcome from './containers/Welcome';

const Posts = React.lazy(() => import('./containers/Posts'));

class App extends Component {
  
  state = {
    show: false
  }

  modeHandler = () => {
    this.setState(prev => {
      return { show: !prev.show }
    });
  }

  render() {
    return (
      <>
        <button onClick={this.modeHandler}>Toggle Mode</button>
        {this.state.show ? (
          <Suspense fallback={<div>Loading . . .</div>}>
            <Posts />
          </Suspense>  
        ) : <User />}
      </>
      // <BrowserRouter>
      //   <>
      //     <nav>
      //       <NavLink to="/user">User Page</NavLink> |&nbsp;
      //       <NavLink to="/posts">Posts Page</NavLink>
      //     </nav>
      //     <Route path="/" component={Welcome} exact />
      //     <Route path="/user" component={User} />
      //     <Route path="/posts" render={() => (
      //       <Suspense fallback={<div>Loading . . .</div>}>
      //         <Posts />
      //       </Suspense>
      //       )}
      //     />
      //   </>
      // </BrowserRouter>
    );
  }
}

export default App;