import { Router } from 'express';
const authJwt = require('./verifyJwtToken');
import {
  index, show, create, update, destroy,
} from '../controllers/products';

const router = new Router();

/**
 * @swagger
 *
 * definitions:
 *  Product:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      description:
 *        type: string
 *      price:
 *        type: number
 */


/**
 * @swagger
 * /products:
 *   get:
 *     description: Returns products
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: books
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Product'
 */
router.get('/', [authJwt.verifyToken], index);

/**
 * @swagger
 * /products/{id}:
 *  get:
 *    description: Returns a single product
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *    produces:
 *     - application/json
 *    responses:
 *      200:
 *        description: product
 *        schema:
 *          $ref: '#/definitions/Product'
 */
router.get('/:id', [authJwt.verifyToken], show);

/**
 * @swagger
 * /products:
 *   post:
 *     description: Creates a product
 *     parameters:
 *      - name: product
 *        in:  body
 *        type: string
 *        schema:
 *          $ref: '#/definitions/Product'
 *     produces:
 *      - application/json
 *     responses:
 *       201:
 *         description: book
 *         schema:
 *           $ref: '#/definitions/Product'
 */
router.post('/', [authJwt.verifyToken], create);


/**
 * @swagger
 * /products/{id}:
 *   put:
 *     description: Update a product
 *     parameters:
 *      - name: id
 *        in: path
 *        schema:
 *          type: string
 *        required: true
 *      - name: product
 *        description: Product object
 *        in:  body
 *        required: true
 *        type: string
 *        schema:
 *          $ref: '#/definitions/Product'
 *     produces:
 *      - application/json
 *     responses:
 *       204:
 *         description: the product was updated
 */
router.put('/:id', [authJwt.verifyToken], update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     description: Deletes a product
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *     produces:
 *      - application/json
 *     responses:
 *       204:
 *         description: the product was deleted
 */
router.delete('/:id', [authJwt.verifyToken], destroy);

export default router;
