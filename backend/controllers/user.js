//bcrypt for password hashing, jwt for token auth, and user model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//signup funtion uses user model to create user, hashes user password, and saves to database
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save().then(
                () => {
                    res.status(201).json({
                        message: 'User added successfully!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    );
};

//login function checks for user info in database using bcrypt to compare hashed password and issues token if validated
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
        (user) => {
        if (!user) {
            return res.status(401).json({
            error: new Error('User not found!')
            });
        }
        bcrypt.compare(req.body.password, user.password).then(
            (valid) => {
            if (!valid) {
                return res.status(401).json({
                error: new Error('Incorrect password!')
                });
            }
            const token = jwt.sign(
                { userId: user._id },
                'VnhAAfTqaKPTU7hWdJFFP5A5',
                { expiresIn: '24h' });
            res.status(200).json({
                userId: user._id,
                token: token
            });
            }
        ).catch(
            (error) => {
            res.status(500).json({
                error: error
            });
            }
        );
        }
    ).catch(
        (error) => {
        res.status(500).json({
            error: error
        });
        }
    );
};