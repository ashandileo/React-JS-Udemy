import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const logout = () => {
  localStorage.clear()
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
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
      if (data) {
        localStorage.setItem("token", data.idToken)
        localStorage.setItem("expirationDate", new Date(new Date().getTime() + data.expiresIn * 1000))
        localStorage.setItem("userId", data.localId)
        dispatch(authSuccess(data.idToken, data.localId))
        dispatch(checkAuthTimeout(data.expiresIn))
      }
    } catch (error) {
      dispatch(authFail(error.response.data.error))
    }
    
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token")
    const expirationDate = new Date(localStorage.getItem("expirationDate"))
    const userId = localStorage.getItem("userId")

    if (!token) {
      dispatch(logout())
    } else {
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}