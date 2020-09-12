import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import { Link } from 'react-router-dom';

import axios from '../../../axios';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: []
  }

  postSelectedHandler = (id) => {
    this.setState({selectedPostId: id});
  }

  componentDidMount() {
    console.log(this.props);
    axios.get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Ashandi'
          }
        })
        this.setState({posts: updatedPosts});
      })
      .catch(error => {
        console.log("Posts -> componentDidMount -> error", error)
      })
  }

  render() {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
    if(!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Link to={'/' + post.id} key={post.id}>
            <Post 
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          </Link>
        )
      })
    }

    return (
      <section className="Posts">
        {posts}
      </section>
    )
  }
}

export default Posts;