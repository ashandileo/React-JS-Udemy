import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';


import axios from '../../axios';
import './Blog.css';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {

    state = {
        auth: true
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    to="/posts"
                                    exact
                                    activeClassName="my-active"
                                    activeStyle={{ color: 'blue', textDecoration: 'underline', fontWeight: 'bold' }}
                                >    
                                    Posts
                                </NavLink>
                            </li>
                            <li><NavLink to={{
                                pathname: "/new-post",
                                hash: "#submit",
                                search: "?quick-submit=true"
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.auth && <Route path="/new-post" component={AsyncNewPost} />}
                    <Route path="/posts" component={Posts} />
                    <Route render={() => <h1>404 Not Found</h1>} />
                    {/* <Redirect from="/" to="/posts" /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;