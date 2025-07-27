# RoboVestX Database Schema

## Users
```json
{
  "_id": "ObjectId",
  "username": "String",
  "email": "String",
  "password": "String", // Hashed
  "role": "String", // 'user', 'trader', 'admin'
  "isBlocked": "Boolean",
  "twoFactorSecret": "String",
  "isTwoFactorEnabled": "Boolean",
  "kyc": {
    "status": "String", // 'pending', 'approved', 'rejected'
    "documentUrl": "String"
  },
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Wallets
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId", // Ref to Users
  "balance": "Number",
  "currency": "String", // 'USD', 'BTC', 'ETH'
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Transactions
```json
{
  "_id": "ObjectId",
  "walletId": "ObjectId", // Ref to Wallets
  "type": "String", // 'deposit', 'withdrawal', 'transfer'
  "amount": "Number",
  "status": "String", // 'pending', 'completed', 'failed'
  "fromUserId": "ObjectId", // for transfers
  "toUserId": "ObjectId", // for transfers
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Traders
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId", // Ref to Users
  "followers": ["ObjectId"], // Array of User IDs
  "roi": "Number",
  "riskLevel": "String", // 'low', 'medium', 'high'
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Trades
```json
{
  "_id": "ObjectId",
  "traderId": "ObjectId", // Ref to Traders
  "copiedBy": "ObjectId", // Ref to Users
  "asset": "String", // e.g., 'BTC/USD'
  "type": "String", // 'buy', 'sell'
  "amount": "Number",
  "entryPrice": "Number",
  "exitPrice": "Number",
  "status": "String", // 'open', 'closed'
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Investment Plans
```json
{
  "_id": "ObjectId",
  "name": "String", // 'Fixed Income', 'Aggressive Growth'
  "description": "String",
  "minAmount": "Number",
  "maxAmount": "Number",
  "roi": "Number", // Percentage
  "duration": "Number" // in days
}
```

## Investments
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId", // Ref to Users
  "planId": "ObjectId", // Ref to InvestmentPlans
  "amount": "Number",
  "startDate": "Date",
  "endDate": "Date",
  "status": "String", // 'active', 'matured'
  "profit": "Number",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Audit Logs
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "action": "String", // e.g., 'login', 'create_trade'
  "ipAddress": "String",
  "device": "String",
  "timestamp": "Date"
}
```
