/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { incrementOnServer, decrementOnServer } from '../store';

const Users = ({ users, add, subtract }) => {
  return (
    <ul className="list-group">
      {
        users.map( user => (
          <li className="list-group-item" style={{fontSize: 18}} key={ user.id }>
            <Link to={`/users/${user.id}`}>{ user.name }</Link>
            <br />
            <button className="btn btn-danger" onClick={() => subtract(user)}>-</button>
              &nbsp;{ user.rating }&nbsp;
            <button className="btn btn-success" onClick={() => add(user)}>+</button>
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
