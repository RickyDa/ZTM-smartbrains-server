const db = require('../config')

const createPassword = async (email, hash) => {
    try {
        const rv = await db('passwords').insert({ email: email, hash: hash }).returning('*')
        return rv[0]
    } catch (err) {
        throw err.detail
    }
}

const getPasswordByEmail = async (email) => {
    try {
        const user = await db('passwords').select('*').where('email', '=', email)
        if (user.length)
            return user[0];
        throw 'Profile not found';
    } catch (err) {
        console.log(err);
        throw `${err}, error getting user`;
    }
}

module.exports = {
    createPassword,
    getPasswordByEmail,
}