/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUserFromServer, saveUserOnServer, errorHandler } from '../store';

class UserForm extends React.Component {
  constructor({ user, error, deleteUser, saveUser, errorHandler }) {
    super()
    this.state = {
      user: {
        name: user ? user.name : '',
        rating: user ? user.rating : ''
      }
    }
    this.onDelete = this.onDelete.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillUnmount() {
    this.props.errorHandler('')
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps
    this.setState({
      user: {
        name: user ? user.name : '',
        rating: user ? user.rating : ''
      }
    })
  }

  onDelete(id) {
    this.props.deleteUser(id)
  }

  onSave(ev) {
    ev.preventDefault()
    const { id } = this.props
    const { name, rating } = this.state.user
    this.props.saveUser({ id, name, rating })
  }

  onChange(ev) {
    const { user } = this.state
    const input = ev.target.value
    const attribute = ev.target.name
    user[attribute] = input
    this.setState({ user })
  }

  render() {
    const { onDelete, onSave, onChange } = this
    const { name, rating } = this.state.user
    const { id, error, errorHandler } = this.props
    return (
      <div>
        <h3 style={{ marginTop: 20}}>{ id ? ('Update user') : ('Create user')}</h3>

        {
          error.message &&
          <div id="error-alert" className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>{error.type}: </strong> {error.message}
            <button onClick={() => {
              errorHandler('')
            }} className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }

        <form onSubmit={ onSave }>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label font-weight-bold">Name</label>
            <div className="col-sm-10">
              <input
                id="name-input"
                type="text"
                placeholder="Letters only, please"
                className="form-control"
                name="name"
                onChange={onChange}
                value={name}
              />
              <div id="name-alert" className="alert alert-danger alert-dismissible fade show show-error" role="alert">
                <strong>Hey, that's not a letter</strong>
              </div>
            </div>

          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label font-weight-bold">Rating</label>
            <div className="col-sm-10 has-danger">
              <input
                id="rating-input"
                type="tel"
                placeholder="Numbers only, please"
                className="form-control form-control-danger"
                name="rating"
                onChange={onChange}
                value={rating}
              />
              <div id="rating-alert" className="alert alert-danger alert-dismissible fade show show-error" role="alert">
                <strong>Hey, that's not a number</strong>
              </div>
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

const mapStateToProps = ({ users, error }, { id }) => {
  const user = users.find( u => u.id === id)
  return {
    user,
    error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deleteUserFromServer(id)),
    saveUser: (user) => dispatch(saveUserOnServer(user)),
    errorHandler: (error) => dispatch(errorHandler(error))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
