const express = require('express');
const router = express.Router();
const {
  getInvestmentPlans,
  invest,
  getPortfolio,
  withdrawInvestment,
} = require('../controllers/investment');
const { protect } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Investment
 *   description: Investment management
 */

/**
 * @swagger
 * /investment-plans:
 *   get:
 *     summary: Get all investment plans
 *     tags: [Investment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of investment plans
 *       500:
 *         description: Server error
 */
router.get('/investment-plans', protect, getInvestmentPlans);

/**
 * @swagger
 * /invest:
 *   post:
 *     summary: Invest in a plan
 *     tags: [Investment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planId
 *               - amount
 *             properties:
 *               planId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Investment created successfully
 *       400:
 *         description: Invalid investment data
 *       404:
 *         description: Investment plan not found
 */
router.post('/invest', protect, invest);

/**
 * @swagger
 * /portfolio:
 *   get:
 *     summary: Get user portfolio
 *     tags: [Investment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of investments
 *       500:
 *         description: Server error
 */
router.get('/portfolio', protect, getPortfolio);

/**
 * @swagger
 * /withdraw:
 *   post:
 *     summary: Withdraw from a matured investment
 *     tags: [Investment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - investmentId
 *             properties:
 *               investmentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Withdrawal successful
 *       400:
 *         description: Investment has not matured yet
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Investment not found
 */
router.post('/withdraw', protect, withdrawInvestment);

module.exports = router;
