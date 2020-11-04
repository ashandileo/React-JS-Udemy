import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (e, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: this.checkValidity(e.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }
    this.setState({controls: updatedControls})
  }

  submitHandler = e => {
    e.preventDefault()
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    const isSignup = this.state.isSignup
    this.props.onAuth(email, password, isSignup)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup }
    })
  }

  render () {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    return (
      <div className={classes.Auth}>
        {
          this.props.isAuthenticated && <Redirect to="/" />
        }
        {
          this.props.error && <p>{this.props.error.message}</p>
        }
        { this.props.loading ? <Spinner /> : (
          <Fragment>
            <form onSubmit={this.submitHandler}>
              {formElementsArray.map(formElement => (
                <Input
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  invalid={!formElement.config.valid}
                  shouldValidate={formElement.config.validation}
                  touched={formElement.config.touched}
                  changed={(e) => this.inputChangedHandler(e, formElement.id)}
                />
              ))}
              <Button btnType="Success">
                SUBMIT
              </Button>
            </form>
            <Button
              btnType="Danger"
              clicked={this.switchAuthModeHandler}
            >
              SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
            </Button>
          </Fragment>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);