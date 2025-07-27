const express = require('express');
const router = express.Router();
const {
  getUsers,
  blockUser,
  getKycSubmissions,
  approveKyc,
  getTradeLogs,
  getInvestmentLogs,
} = require('../controllers/admin');
const { protect, admin } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin controls
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Server error
 */
router.get('/admin/users', protect, admin, getUsers);

/**
 * @swagger
 * /admin/block-user:
 *   post:
 *     summary: Block or unblock a user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User block status updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/admin/block-user', protect, admin, blockUser);

/**
 * @swagger
 * /admin/kyc:
 *   get:
 *     summary: Get all KYC submissions
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of KYC submissions
 *       500:
 *         description: Server error
 */
router.get('/admin/kyc', protect, admin, getKycSubmissions);

/**
 * @swagger
 * /admin/approve-kyc:
 *   post:
 *     summary: Approve or reject a KYC submission
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - status
 *             properties:
 *               userId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [approved, rejected]
 *     responses:
 *       200:
 *         description: KYC status updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/admin/approve-kyc', protect, admin, approveKyc);

/**
 * @swagger
 * /admin/trade-logs:
 *   get:
 *     summary: Get all trade logs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of trade logs
 *       500:
 *         description: Server error
 */
router.get('/admin/trade-logs', protect, admin, getTradeLogs);

/**
 * @swagger
 * /admin/investment-logs:
 *   get:
 *     summary: Get all investment logs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of investment logs
 *       500:
 *         description: Server error
 */
router.get('/admin/investment-logs', protect, admin, getInvestmentLogs);

module.exports = router;
