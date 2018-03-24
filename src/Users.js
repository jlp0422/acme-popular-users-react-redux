/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = ({ users }) => {
  return (
    <ul>
      {
        users.map( user => (
          <li key={ user.id }>
            <Link to={`/users/${user.id}`}>{ user.name }</Link>
            <br />
            <button>-</button>&nbsp;{ user.rating }&nbsp;<button>+</button>
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

export default connect(mapStateToProps)(Users)
