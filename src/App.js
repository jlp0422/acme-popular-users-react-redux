/* eslint-disable */
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Users from './Users';
import UserForm from './UserForm';
import { getUsersFromServer } from '../store';
import { connect } from 'react-redux';

class App extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    return (
      <Router >
        <div>
          <Nav />
          <Switch>
            <Route exact path='/users' component={ Users } />
            <Route exact path='/users/create' render={({ history }) => <UserForm history={ history }/>} />
            <Route exact path='/users/:id' render={({ match, history }) => <UserForm id={ match.params.id*1} history={ history } />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsersFromServer())
  }
}

export default connect(null, mapDispatchToProps)(App);
