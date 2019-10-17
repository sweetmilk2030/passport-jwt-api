import models from '../models';
import Sequelize from 'sequelize';
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const { User, Role, User_Roles } = models;
const Op = Sequelize.Op;

const verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];
  
	if (!token){
		return res.status(403).send({ 
			auth: false, message: 'No token provided.' 
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err){
			return res.status(500).send({ 
					auth: false, 
					message: 'Fail to Authentication. Error -> ' + err 
				});
		}
		req.userId = decoded.id;
		next();
	});
}

const isAdmin = async (req, res, next) => {
	await User.findByPk(req.userId)
		.then(user => {
			(async () => {
				if(user.id) {
					var userRoles = await User_Roles.findAll({
						where: {
							user_id: user.id
						}
					});
	
					var roles = await Role.findAll({
						where: {
							id: {
								[Op.in]: userRoles.map((data, index) => { return data.role_id})
							}
						}
					});
	
					for(let i=0; i < roles.length; i++) {
						if(roles[i].name.toUpperCase() === "ADMIN") {
							next();
							return;
						}
					}
				}
	
				res.status(403).send("Require Admin Role!");
			})();
		})
}

const isPmOrAdmin = async (req, res, next) => {
	await User.findByPk(req.userId)
		.then(user => {
			(async () => {
				if(user.id) {
					var userRoles = await User_Roles.findAll({
						where: {
							user_id: user.id
						}
					});
	
					var roles = await Role.findAll({
						where: {
							id: {
								[Op.in]: userRoles.map((data, index) => { return data.role_id})
							}
						}
					});
	
					for(let i=0; i < roles.length; i++) {
						if(roles[i].name.toUpperCase() === "ADMIN") {
							next();
							return;
						}
						if(roles[i].name.toUpperCase() === "PM") {
							next();
							return;
						}
					}
				}
	
				res.status(403).send("Require PM or Admin Roles!");
			})();
		})
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
authJwt.isPmOrAdmin = isPmOrAdmin;

module.exports = authJwt;