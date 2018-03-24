/* eslint-disable */
import axios from 'axios';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const GET_USERS = 'GET_USERS';
const DELETE_USER = 'DELETE_USER';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';

const initialState = {
  users: []
}

// GET USERS
const getUsers = (users) => {
  return {
    type: GET_USERS,
    users
  }
}

export const getUsersFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/users')
      .then( res => res.data)
      .then( users => dispatch(getUsers(users)))
  }
}

// CREATE AND UPDATE USER
const saveUser = (user) => {
  return {
    type: SAVE_USER,
    user
  }
}

export const saveUserOnServer = (user) => {
  const { id } = user;
  const method = id ? 'put' : 'post';
  const action = id ? UPDATE_USER : CREATE_USER
  const url = `/api/users/${id ? id : ''}`;
  return (dispatch) => {
    return axios[method](url, user)
      .then( res => res.data)
      .then( user => dispatch({
        type: action,
        user
      }))
      .then(() => location.hash = '/users')
  }
}

// DELETE USER
const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    id
  }
}

export const deleteUserFromServer = (id) => {
  return (dispatch) => {
    return axios.delete(`/api/users/${id}`)
      .then(() => dispatch(deleteUser(id)))
      .then(() => location.hash = '/users' )
  }
}

// ADD OR SUBTRACT ONE TO RATING
const changeRating = (user) => {
  return {
    type: UPDATE_USER,
    user
  }
}

export const incrementOnServer = (user) => {
  const { id } = user
  let { rating } = user
  const newRating = rating+1
  return (dispatch) => {
    return axios.put(`/api/users/${id}`, {rating: newRating})
      .then( res => res.data)
      .then( user => dispatch(changeRating(user)))
  }
}

export const decrementOnServer = (user) => {
  const { id } = user
  let { rating } = user
  const newRating = rating - 1
  return (dispatch) => {
    return axios.put(`/api/users/${id}`, { rating: newRating })
      .then(res => res.data)
      .then(user => dispatch(changeRating(user)))
  }
}


const reducer = (state = initialState, action) => {
  switch(action.type) {

    case GET_USERS:
      return Object.assign({}, state, { users: action.users })

    case DELETE_USER:
      const users = state.users.filter(user => user.id !== action.id)
      return Object.assign({}, state, { users })

    case CREATE_USER:
      return Object.assign({}, state, { users: [...state.users, action.user ]})

    case UPDATE_USER:
      const otherUsers = state.users.filter(user => user.id !== action.user.id)
      return Object.assign({}, state, { users: [...otherUsers, action.user ]})

  }
  return state
}


const store = createStore(reducer, applyMiddleware(thunk))

export default store;
