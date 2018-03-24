/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ users, topUser }) => {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className="nav-link" to='/'>Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/users'>Users ({ users.length })</Link>
      </li>
      {
        users.length ?
        <li className="nav-item">
          <Link className="nav-link" to={`/users/${topUser.id}`}>Top User: {topUser.name} ({topUser.rating})</Link>
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
    topUser
  }
}

export default connect(mapStateToProps)(Nav);
