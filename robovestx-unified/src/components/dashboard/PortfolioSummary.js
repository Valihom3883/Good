import { Card, Metric, Text } from '@tremor/react';

export default function PortfolioSummary({ balance, profit, activeInvestments }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <Text>Wallet Balance</Text>
        <Metric>${balance.toFixed(2)}</Metric>
      </Card>

      <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
        <Text>Total Profit</Text>
        <Metric className={profit >= 0 ? 'text-green-600' : 'text-red-600'}>
          ${profit >= 0 ? '+' : ''}{profit.toFixed(2)}
        </Metric>
      </Card>

      <Card className="bg-gradient-to-r from-purple-50 to-violet-50">
        <Text>Active Investments</Text>
        <Metric>{activeInvestments}</Metric>
      </Card>
    </div>
  );
}
