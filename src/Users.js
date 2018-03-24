/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { incrementOnServer, decrementOnServer } from '../store';

const Users = ({ users, add, subtract }) => {
  return (
    <div>
      <h3 style={{ marginTop: 20 }}>These are our users</h3>
      <ul className="list-group">
        {
          users.map( user => (
            <li className="list-group-item" style={{fontSize: 20}} key={ user.id }>
              <Link to={`/users/${user.id}`}>{ user.name }</Link>
              <br />
              <button className="btn btn-danger font-weight-bold" onClick={() => subtract(user)}>-</button>
                &nbsp;&nbsp;{ user.rating }&nbsp;&nbsp;
              <button className="btn btn-success" onClick={() => add(user)}>+</button>
            </li>
          ))
        }
      </ul>
    </div>
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
