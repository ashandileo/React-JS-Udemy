import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const auth = (email, password) => {
  return async dispatch => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    try {
      const { data } = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3ZAtSXLZfmEJCnvRlH_ra-T4qA3jzpSo', {
        ...authData
      })
      data && dispatch(authSuccess(data))
    } catch (error) {
      dispatch(authFail(error))
    }
    
  }
}