const bcrypt = require('bcrypt')

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10)
}

const comparePassword = (pass, hashedPass) => {
    return bcrypt.compareSync(pass, hashedPass)
}

module.exports = { hashPassword, comparePassword }