const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABAS_URL || 'postgres://localhost/demo_db', {
  logging: false
});

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  rating: {
    type: Sequelize.INTEGER
  }
})

const sync = () => {
  return conn.sync({ force: true })
}

const seed = () => {
  return Promise.all([
    User.create({ name: 'Jeremy', rating: 7 }),
    User.create({ name: 'Evan', rating: 2 }),
    User.create({ name: 'Rachel', rating: 4 })
  ])
}

module.exports = {
  sync,
  seed,
  models: {
    User
  }
}
