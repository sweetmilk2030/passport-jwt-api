import { Router } from 'express';
const authJwt = require('./verifyJwtToken');

import {
  getAll, create
} from '../controllers/user_roles';

const router = new Router();

/**
 * @swagger
 *
 * definitions:
 *  UserRole:
 *    type: object
 *    properties:
 *      user_id:
 *        type: integer
 *      role_id:
 *        type: integer
 */


/**
 * @swagger
 * /userRoles:
 *   get:
 *     description: Returns userRoles
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: books
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/UserRole'
 */
router.get('/', getAll);// [authJwt.verifyToken, authJwt.isPmOrAdmin],

/**
 * @swagger
 * /userRoles:
 *   post:
 *     description: Creates a userRoles
 *     parameters:
 *      - name: userRoles
 *        in:  body
 *        type: string
 *        schema:
 *          $ref: '#/definitions/UserRole'
 *     produces:
 *      - application/json
 *     responses:
 *       201:
 *         description: book
 *         schema:
 *           $ref: '#/definitions/UserRole'
 */
router.post('/', create);//[authJwt.verifyToken, authJwt.isAdmin],

export default router;
