const db = require('./mysql');

const users = db.sequelize.define('users', {
    nome: {
        type: db.Sequelize.DataTypes.STRING
    },
    email: {
        type: db.Sequelize.DataTypes.STRING
    }
});

// force creation of the table
//users.sync({ force: true })
//users.sync()

module.exports = users;