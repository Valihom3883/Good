const express = require('express');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const connectDB = require('./config/db');
const audit = require('./api/middlewares/audit');
const authRoutes = require('./api/routes/auth');
const tradingRoutes = require('./api/routes/trading');
const investmentRoutes = require('./api/routes/investment');
const walletRoutes = require('./api/routes/wallet');
const adminRoutes = require('./api/routes/admin');
const { requestDurationMiddleware, metricsEndpoint } = require('./api/middlewares/metrics');
const helmet = require('helmet');

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "trusted-cdn.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "api.example.com"],
      },
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: 'same-origin' },
    frameguard: { action: 'deny' },
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(requestDurationMiddleware);

app.use(audit);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/api', authRoutes);
app.use('/api', tradingRoutes);
app.use('/api', investmentRoutes);
app.use('/api', walletRoutes);
app.use('/api', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.get('/metrics', metricsEndpoint);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
