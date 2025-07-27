const express = require('express');
const router = express.Router();
const {
  getTraders,
  copyTrader,
  stopCopyTrader,
  executeTrade,
  getCopiedTrades,
} = require('../controllers/trading');
const { protect, trader } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Trading
 *   description: Copy trading operations
 */

/**
 * @swagger
 * /traders:
 *   get:
 *     summary: Get all traders
 *     tags: [Trading]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of traders
 *       500:
 *         description: Server error
 */
router.get('/traders', protect, getTraders);

/**
 * @swagger
 * /copy:
 *   post:
 *     summary: Copy a trader
 *     tags: [Trading]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - traderId
 *             properties:
 *               traderId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Started copying trader
 *       400:
 *         description: Already copying this trader
 *       404:
 *         description: Trader not found
 */
router.post('/copy', protect, copyTrader);

/**
 * @swagger
 * /stop-copy:
 *   post:
 *     summary: Stop copying a trader
 *     tags: [Trading]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - traderId
 *             properties:
 *               traderId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Stopped copying trader
 *       404:
 *         description: Trader not found
 */
router.post('/stop-copy', protect, stopCopyTrader);

/**
 * @swagger
 * /execute-trade:
 *   post:
 *     summary: Execute a trade (for traders)
 *     tags: [Trading]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - asset
 *               - type
 *               - amount
 *               - entryPrice
 *             properties:
 *               asset:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [buy, sell]
 *               amount:
 *                 type: number
 *               entryPrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Trade executed successfully
 *       500:
 *         description: Server error
 */
router.post('/execute-trade', protect, trader, executeTrade);

/**
 * @swagger
 * /copied-trades:
 *   get:
 *     summary: Get all copied trades for a user
 *     tags: [Trading]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of copied trades
 *       500:
 *         description: Server error
 */
router.get('/copied-trades', protect, getCopiedTrades);

module.exports = router;
