require('dotenv').config();
const { BadRequestError } = require('../errors');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new BadRequestError('Please provide email and password', 400);
    }

    const id = new Date().getDate();

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });

    res.status(200).json({ msg: 'user created', token: token });
}


const dashboard = async (req, res) => {
    const { username } = req.user;
    const secretNumber = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: `Hello ${username}`, secret: `Here is your authorized data, your lucky number is ${secretNumber}` })
}


module.exports = { login, dashboard };