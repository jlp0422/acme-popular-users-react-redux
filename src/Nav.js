/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Nav = ({ users, topUser }) => {
  return (
    <ul>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/users'>Users ({ users.length })</NavLink>
      </li>
      <li>
        <NavLink to={`/users/${topUser.id}`}>Top User: { topUser.name } ({topUser.rating})</NavLink>
      </li>
      <li>
        <NavLink to='/users/create'>Create User</NavLink>
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
