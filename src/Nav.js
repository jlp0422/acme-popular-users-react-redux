/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ users, topUser }) => {
  // console.log(location.hash)
  return (
    <ul style={{ marginTop: 10 }} className="nav nav-tabs">
      <li className="nav-item">
        <Link className="nav-link" to='/'>Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/users'>Users: <span style={{ fontSize: 14 }} className="badge badge-pill badge-primary">{users.length}</span>
        </Link>
      </li>
      {
        users.length ?
        <li className="nav-item">
          <Link className="nav-link" to={`/users/${topUser.id}`}>Top User: <span style={{ fontSize: 14 }}className="badge badge-pill badge-primary">{topUser.name} ({topUser.rating})</span>
          </Link>
        </li> : null
      }
      <li className="nav-item">
        <Link className="nav-link" to='/users/create'>Create User</Link>
      </li>
    </ul>
  )
}

const mapStateToProps = ({ users }) => {
  const topUser = users.length && users.reduce((memo, item) => {
    return memo.rating >= item.rating ? memo : item
  })
  return {
    users,
    topUser,
  }
}

export default connect(mapStateToProps)(Nav);
