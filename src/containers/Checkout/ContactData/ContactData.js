import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props)
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2),
      customer: {
        name: 'Ashandi Leonadi',
        address: {
          street: 'disini',
          zipCode: '3123',
          country: 'Indonesia'
        }
      },
      email: 'test@test.com',
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading: false});
      });
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form>
            <Input type="text" name="name" placeholder="Your Name" />
            <Input type="text" name="email" placeholder="Your Mail" />
            <Input type="text" name="street" placeholder="Street" />
            <Input type="text" name="postal" placeholder="Postal Code" />
            <Button
              btnType="Success"
              clicked={this.orderHandler}
            >
              Order
            </Button>
          </form>
        )}
      </div>
    )
  }
}

export default withRouter(ContactData);