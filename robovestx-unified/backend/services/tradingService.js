import Trade from '../models/Trade';
import Trader from '../models/Trader';
import Wallet from '../models/Wallet';
import logger from './logger';

class TradingService {
  static async executeTrade(traderId, { asset, type, amount, entryPrice }) {
    try {
      // Validate trade parameters
      if (!['buy', 'sell'].includes(type)) {
        throw new Error('Invalid trade type');
      }

      if (amount <= 0) {
        throw new Error('Trade amount must be positive');
      }

      // Create trade for trader
      const trade = await Trade.create({
        trader: traderId,
        asset,
        type,
        amount,
        entryPrice,
        status: 'open'
      });

      // Mirror for followers with allocation logic
      const trader = await Trader.findById(traderId).populate('followers');

      await Promise.all(trader.followers.map(async (follower) => {
        try {
          const allocation = await this.calculateAllocation(follower, amount);
          await Trade.create({
            trader: traderId,
            copiedBy: follower._id,
            asset,
            type,
            amount: allocation,
            entryPrice,
            status: 'open',
            isCopied: true
          });

          logger.info(`Copied trade ${trade._id} to follower ${follower._id} with amount ${allocation}`);
        } catch (error) {
          logger.error(`Failed to copy trade to follower ${follower._id}: ${error.message}`);
        }
      }));

      return trade;
    } catch (error) {
      logger.error(`Trade execution failed: ${error.message}`);
      throw error;
    }
  }

  static async calculateAllocation(user, baseAmount) {
    try {
      const wallet = await Wallet.findOne({ user: user._id });
      if (!wallet) {
        throw new Error('Wallet not found for user');
      }

      // Max 10% of balance per trade
      const maxAllocation = wallet.balance * 0.1;
      const allocation = Math.min(baseAmount, maxAllocation);

      // Ensure allocation doesn't exceed available balance
      if (allocation > wallet.availableBalance) {
        throw new Error('Insufficient funds for trade allocation');
      }

      return allocation;
    } catch (error) {
      logger.error(`Allocation calculation failed for user ${user._id}: ${error.message}`);
      throw error;
    }
  }
}

export default TradingService;
