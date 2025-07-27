const express = require('express');
const router = express.Router();
const {
  getWallet,
  deposit,
  withdraw,
  transfer,
} = require('../controllers/wallet');
const { protect } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Wallet
 *   description: Wallet management
 */

/**
 * @swagger
 * /wallet:
 *   get:
 *     summary: Get wallet balance
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet details
 *       500:
 *         description: Server error
 */
router.get('/wallet', protect, getWallet);

/**
 * @swagger
 * /deposit:
 *   post:
 *     summary: Deposit funds into wallet
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Funds deposited successfully
 *       500:
 *         description: Server error
 */
router.post('/deposit', protect, deposit);

/**
 * @swagger
 * /withdraw-wallet:
 *   post:
 *     summary: Withdraw funds from wallet
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Funds withdrawn successfully
 *       400:
 *         description: Insufficient balance
 *       500:
 *         description: Server error
 */
router.post('/withdraw-wallet', protect, withdraw);

/**
 * @swagger
 * /transfer:
 *   post:
 *     summary: Transfer funds to another user
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - recipientEmail
 *             properties:
 *               amount:
 *                 type: number
 *               recipientEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transfer successful
 *       400:
 *         description: Insufficient balance
 *       404:
 *         description: Recipient not found
 *       500:
 *         description: Server error
 */
router.post('/transfer', protect, transfer);

module.exports = router;
