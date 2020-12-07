const bcrypt = require('bcrypt');
const passwords = require('../db/api/passwords')
const users = require('../db/api/users')
const saltRounds = 10;

const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const register = async (req, res) => {
    const { name, password, email } = req.body;
    if( !name || !password || !email)
        return res.status(400).json(`missing fields, Unable to register`)
    hash = encryptPassword(password);
    try {
        const pwEntry = await passwords.createPassword(email, hash);
        const userEntry = await users.createUser(pwEntry.email, name)
        res.json(userEntry)
    } catch (err) {
        res.status(400).json(`${err} Unable to register`)
    }
}

module.exports = { register: register };


