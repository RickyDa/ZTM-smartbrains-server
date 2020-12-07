const users = require('../db/api/users')

const getProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await users.getUserById(id);
        if (user)
            res.json(user);
        else
            throw 'Profile not found';
    } catch (err) {
        console.log(err);
        res.status(400).json(`${err}, error getting user`);
    }
}

const updateEntries = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await users.incrementUserEntries(id)
        res.json(user.entries)
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    getProfile: getProfile,
    updateEntries: updateEntries
};