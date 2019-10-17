import { Router } from 'express';
const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

import {
  getAll, create
} from '../controllers/roles';

const router = new Router();

/**
 * @swagger
 *
 * definitions:
 *  Role:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 */


/**
 * @swagger
 * /roles:
 *   get:
 *     description: Returns roles
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: books
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Role'
 */
router.get('/', [authJwt.verifyToken, authJwt.isPmOrAdmin], getAll);

/**
 * @swagger
 * /roles:
 *   post:
 *     description: Creates a role
 *     parameters:
 *      - name: role
 *        in:  body
 *        type: string
 *        schema:
 *          $ref: '#/definitions/Role'
 *     produces:
 *      - application/json
 *     responses:
 *       201:
 *         description: book
 *         schema:
 *           $ref: '#/definitions/Role'
 */
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], create);

export default router;
