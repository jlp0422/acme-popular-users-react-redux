/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { deleteUserFromServer } from '../store';


class UserForm extends React.Component {
  constructor({ user, deleteUser }) {
    super()
    this.state = {
      name: user ? user.name : '',
      rating: user ? user.rating : ''
    }
    this.onDelete = this.onDelete.bind(this)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeRating = this.onChangeRating.bind(this)
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
    console.log(id)
    this.props.deleteUser(id)
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
    const { onDelete, onChangeName, onChangeRating } = this
    const { name, rating } = this.state
    const { id } = this.props
    return (
      <div>
        <form>
          <input onChange={ onChangeName } value={ name }/>
          <input onChange={ onChangeRating } value={ rating }/>
          <button>
            { id ? ('Update') : ('Save') }
          </button>
        </form>
        {
          id && <button onClick={() => onDelete(id)}>Delete</button>
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
    deleteUser: (id) => dispatch(deleteUserFromServer(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
