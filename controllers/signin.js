const bcrypt = require('bcrypt');
const passwords = require('../db/api/passwords')
const users = require('../db/api/users')

const signin = async (req, res) => {

    const { email, password } = req.body;
    try {
        const data = await passwords.getPasswordByEmail(email)
        if (data) {
            const isValid = await bcrypt.compare(password, data.hash)
            if (isValid) {
                try {
                    const user = await users.getUserByEmail(email)
                    res.json(user)
                } catch (err) {
                    console.log(err)
                    throw 'unable to get user'
                }
            } else
                throw 'wrong password or email'
        } else
            throw 'User not found'
    } catch (err) {
        console.log(err)
        res.status(400).json(`Error when trying to sign in, [${err}]`)
    }
}

module.exports = { signin: signin };