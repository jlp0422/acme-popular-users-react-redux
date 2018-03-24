/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUserFromServer, saveUserOnServer } from '../store';


class UserForm extends React.Component {
  constructor({ user, deleteUser, saveUser }) {
    super()
    this.state = {
      name: user ? user.name : '',
      rating: user ? user.rating : ''
    }
    this.onDelete = this.onDelete.bind(this)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeRating = this.onChangeRating.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps
    this.setState(
      user ? ({
        name: user.name,
        rating: user.rating
      }) : ({
        name: '',
        rating: ''
      })
    )
  }

  onDelete(id) {
    this.props.deleteUser(id)
  }

  onSave(ev) {
    ev.preventDefault()
    const { id } = this.props
    const { name, rating } = this.state
    this.props.saveUser({ id, name, rating })
  }

  onChangeName(ev) {
    const name = ev.target.value
    this.setState({ name })
  }

  onChangeRating(ev) {
    const rating = ev.target.value
    this.setState({ rating })
  }

  render() {
    const { onDelete, onChangeName, onChangeRating, onSave } = this
    const { name, rating } = this.state
    const { id } = this.props
    return (
      <div>
        <h3 style={{ marginTop: 20}}>{ id ? ('Update user') : ('Create user')}</h3>
       {/*
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Uh oh! Looks like you ran into an error</strong> You should check in on some of those fields below.
          <button className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
    */}
        <form onSubmit={ onSave }>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label font-weight-bold">Name</label>
            <div className="col-sm-10">
              <input className="form-control" onChange={onChangeName} value={name} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label font-weight-bold">Rating</label>
            <div className="col-sm-10">
              <input className="form-control" onChange={onChangeRating} value={rating} />
            </div>
          </div>
          <button style={{margin: '10px 0 20px'}} className="btn btn-outline-success" disabled={name && rating ? null : true}>
            { id ? ('Update') : ('Save') }
          </button>
        </form>
        {
          id &&
          <div>
            <button className="btn btn-outline-danger" onClick={() => onDelete(id)}>Delete</button>
            <br /><br />
            <Link to='/users'>&laquo; Back to all users</Link>
          </div>
        }
    </div>
    )
  }
}

const mapStateToProps = ({ users }, { id }) => {
  const user = users.find( u => u.id === id)
  return {
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deleteUserFromServer(id)),
    saveUser: (user) => dispatch(saveUserOnServer(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
