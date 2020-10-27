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
    token: authData.idToken,
    userId: authData.localId
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const auth = (email, password, isSignup) => {
  return async dispatch => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3ZAtSXLZfmEJCnvRlH_ra-T4qA3jzpSo";
    if (!isSignup) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3ZAtSXLZfmEJCnvRlH_ra-T4qA3jzpSo"
    }
    try {
      const { data } = await axios.post(url, {
        ...authData
      })
      data && dispatch(authSuccess(data))
    } catch (error) {
      dispatch(authFail(error.response.data.error))
    }
    
  }
}