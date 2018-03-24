import React from 'react';
import { connect } from 'react-redux';

const Home = ({ userCount, averageRating}) => {
  return (
    <h3 style={{ marginTop: 20 }}>Check out all of our users. We have {userCount} of them, with an average rating of {averageRating}.</h3>
  )
}

const mapStateToProps = ({ users }) => {
  const userCount = users.length
  const sumRating = users.reduce((memo, item) => {
    return memo + item.rating * 1
  }, 0)
  const averageRating = sumRating / userCount
  return {
    userCount,
    averageRating: Math.round(averageRating * 100) / 100
  }
}

export default connect(mapStateToProps)(Home);
