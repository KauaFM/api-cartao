const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createCartao, getCartoes, getCartaoById, updateCartao, deleteCartao } = require('../controllers/controllerCartoes');

/**
 * @swagger
 * /api/cartoes:
 *   get:
 *     summary: Get all cartoes
 *     tags: [Cartoes]
 *     responses:
 *       200:
 *         description: List of cartoes
 */
/**
 * @swagger
 * /api/cartoes/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Cartoes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cartao data
 *       404:
 *         description: Cartao not found
 */
/**
 * @swagger
 * /api/cartoes/{id}:
 *   put:
 *     summary: Update cartao by ID
 *     tags: [Cartoes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartaoname:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cartao updated successfully
 *       404:
 *         description: Cartao not found
 */
/**
 * @swagger
 * /api/cartoes/{id}:
 *   delete:
 *     summary: Delete cartao by ID
 *     tags: [Cartoes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cartao deleted successfully
 *       404:
 *         description: Cartao not found
 */



router.get('/', getCartoes);
router.get('/:id', getCartaoById);
router.put('/:id', updateCartao);
router.delete('/:id', deleteCartao);
router.post('/', createCartao);

module.exports = router;