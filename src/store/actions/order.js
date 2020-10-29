import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  }
}

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData, token) => {
  return async dispatch => {
    dispatch(purchaseBurgerStart());
    try {
      const { data } = await axios.post('/orders.json?auth=' + token, orderData) || {}
      if (data) {
        dispatch(purchaseBurgerSuccess(data.name, orderData))
      }
    } catch (error) {
      dispatch(purchaseBurgerFail(error))
    }
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  }
}

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = token => {
  return async dispatch => {
    dispatch(fetchOrdersStart())
    try {
      const { data } = await axios.get('/orders.json?auth=' + token) || {}
      if (data) {
        const fetchedOrders = [];
        for (let key in data) {
          fetchedOrders.push({
            ...data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
      }
    } catch (error) {
      dispatch(fetchOrdersFail(error))
    }
  }
}