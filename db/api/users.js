const db = require('../config')

const createUser = async (email, name) => {
    try {
        const rv = await db('users').insert({ email: email, name: name, joined: new Date() }).returning('*')
        return rv[0]
    } catch (err) {
        throw err.detail
    }
}

const getUserById = async (id) => {
    try {
        const user = await db('users').select('*').where('id', '=', id)
        if (user.length)
            return user[0];
        throw 'Profile not found';
    } catch (err) {
        console.log(err);
        throw `${err}, error getting user`;
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await db('users').select('*').where('email', '=', email)
        if (user.length)
            return user[0];
        throw 'Profile not found';
    } catch (err) {
        console.log(err);
        throw `${err}, error getting user`;
    }
}

const incrementUserEntries = async (id) => {
    try {
        const user = await db('users').increment('entries', 1).where('id', '=', id).returning('*');
        if (user.length)
            return user[0];
        else
            throw 'unable to update entries';
    } catch (err) {
        throw err;
    }
}

const deleteUserById = async (id) => {
    const numberOfUsers = await db('users').where('id', '=', false).del()
    console.log(`number of users deleted ${numberOfUsers}`)
}


module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    incrementUserEntries,
    deleteUserById
}