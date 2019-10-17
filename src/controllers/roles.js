import models from '../models';

const { Role } = models;

export const getAll = async (req, res, next) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const {
      name
    } = req.body;
    const newRole = await Role.create({
      name
    });
    res.status(201).json(newRole);
  } catch (err) {
    next(err);
  }
};