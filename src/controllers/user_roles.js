import models from '../models';

const { User_Roles } = models;

export const getAll = async (req, res, next) => {
  try {
    const userRoles = await User_Roles.findAll();
    res.json(userRoles);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const {
      user_id, role_id,
    } = req.body;
    const newUserRole = await User_Roles.create({
      user_id,
      role_id
    });
    res.status(201).json(newUserRole);
  } catch (err) {
    next(err);
  }
};