/* eslint-disable */
import axios from 'axios';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const GET_USERS = 'GET_USERS';
const DELETE_USER = 'DELETE_USER';
const INCREMENT = 'INCREMENT';

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


const reducer = (state = initialState, action) => {
  switch(action.type) {

    case GET_USERS:
      return Object.assign({}, state, { users: action.users })

    case DELETE_USER:
      const users = state.users.filter(user => user.id !== action.id)
      return Object.assign({}, state, { users })

  }
  return state
}


const store = createStore(reducer, applyMiddleware(thunk))

export default store;
