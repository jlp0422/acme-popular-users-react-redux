/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { incrementOnServer, decrementOnServer } from '../store';

const Users = ({ users, add, subtract }) => {
  return (
    <ul>
      {
        users.map( user => (
          <li key={ user.id }>
            <Link to={`/users/${user.id}`}>{ user.name }</Link>
            <br />
            <button onClick={() => subtract(user)}>-</button>
              &nbsp;{ user.rating }&nbsp;
            <button onClick={() => add(user)}>+</button>
            <br /><br />
          </li>
        ))
      }
    </ul>
  )
}

const mapStateToProps = ({ users }) => {
  return {
    users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: (user) => dispatch(incrementOnServer(user)),
    subtract: (user) => dispatch(decrementOnServer(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
