import models from '../models';
import debug from 'debug';
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const dbg = debug('BE001:main');
const { User } = models;

export const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const signup = async (req, res, next) => {
  try {
    dbg(`SignUp ${req.body}`);
    const {
      name, email, password, // handle categoryId parameter
    } = req.body;
    const newUser = await User.create({
			name,
			email,
      password: bcrypt.hashSync(password, 8)
    });
    res.status(201).json(newUser);
  } catch (err) {
		dbg(`SignUp ${req.body}`);
    next(err);
  }
};

export const signin = async (req, res, next) => {
	dbg(`SignUp ${req.body.email}`);
	await User.findOne({
		where: {
			email: req.body.email
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send('User Not Found.');
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
		}
		
		var token = jwt.sign({ id: user.id }, config.secret, {
		  expiresIn: 3600 // expires in 10 seconds
		});
		
		res.status(200).send({ auth: true, accessToken: token });
		
	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
}