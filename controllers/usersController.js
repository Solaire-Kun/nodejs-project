const User = require('../models/User');

// Get All User
const user_get_all = async (req, res) => {
    try {
        const usersList = await User.find();
        res.json(usersList).status(200);

    } catch (err) {
        res.json({ message: err }).status(404);
    };
};

// Get User By ID
const user_get_id = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user == null) {
            res.json('User not found').status(404);
        } else {
            res.json(user).status(200);
        };

    } catch (err) {
        res.json({ message: err }).status(404);
    };
};

// Create New User
const user_post = async (req, res) => {
    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
    });

    try {
        const createUser = await user.save();
        res.json(createUser).status(201);

    } catch (err) {
        res.json({ message: err }).status(404);
    };
};

// Update User Information
const user_patch = async (req, res) => {
    try {
        const updateUser = await User.updateOne({ _id: req.params.userId }, {
            $set: {
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email
            }
        });
        res.json({ message: 'User not found' }).status(200);

    } catch (err) {
        res.json({ message: err }).status(404);
    };
};

// Delete User
const user_delete = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.json({ message: 'User not found' }).status(404);

        } else {
            user.deleteOne();
            res.json('User successfully deleted!').status(202);
        };

    } catch (err) {
        res.json({ message: err }).status(404);
    };
};

module.exports = {
    user_get_all,
    user_get_id,
    user_post,
    user_patch,
    user_delete
}