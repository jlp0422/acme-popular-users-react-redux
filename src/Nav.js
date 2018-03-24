/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Nav = ({ users }) => {
  return (
    <ul>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/users'>Users ({ users.length })</NavLink>
      </li>
      <li>
        <NavLink to='/users/create'>Create User</NavLink>
      </li>
    </ul>
  )
}

const mapStateToProps = ({ users }) => {
  return {
    users
  }
}

export default connect(mapStateToProps)(Nav);
