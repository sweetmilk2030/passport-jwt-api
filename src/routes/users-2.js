import { Router } from 'express';
const authJwt = require('./verifyJwtToken');
const verifySignUp = require('./verifySignUp');

import {
  getAll, signup, signin
} from '../controllers/users';

const router = new Router();

/**
 * @swagger
 *
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      password:
 *        type: string
 */

/**
 * @swagger
 * /users:
 *   get:
 *     description: Returns users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: books
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */
router.get('/', [authJwt.verifyToken], getAll);

/**
 * @swagger
 * /users:
 *   post:
 *     description: Creates a user
 *     parameters:
 *      - name: user
 *        in:  body
 *        type: string
 *        schema:
 *          $ref: '#/definitions/User'
 *     produces:
 *      - application/json
 *     responses:
 *       201:
 *         description: book
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post('/signup', [verifySignUp.checkDuplicateUserNameOrEmail], signup);

/**
 * @swagger
 * /users:
 *   post:
 *     description: Sigin
 *     parameters:
 *      - name: user
 *        in:  body
 *        type: string
 *        schema:
 *          $ref: '#/definitions/User'
 *     produces:
 *      - application/json
 *     responses:
 *       201:
 *         description: book
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post('/signin', signin);

export default router;
