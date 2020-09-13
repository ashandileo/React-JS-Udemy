import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 8
        },
        valid: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: ''
      }
    },
    loading: false
  }

  checkValidity = (value, rules) => {
    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== '';
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength;
    }

    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});

    const formData = {};
    for (let formElementIndentifier in this.state.orderForm) {
      formData[formElementIndentifier] = this.state.orderForm[formElementIndentifier].value
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2),
      orderData: formData
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

  inputChangedHandler = (e, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log("ContactData -> inputChangedHandler -> updatedFormElement", updatedFormElement)
    this.setState({orderForm: updatedOrderForm})
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(e) => this.inputChangedHandler(e, formElement.id)} />
            ))}
            <Button
              btnType="Success"
              clicked={this.orderHandler}>
              Order
            </Button>
          </form>
        )}
      </div>
    )
  }
}

export default withRouter(ContactData);