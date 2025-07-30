import client from 'prom-client';

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500]
});

export const requestDurationMiddleware = (req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  const url = req.originalUrl || req.url;

  res.on('finish', () => {
    end({
      method: req.method,
      route: url,
      code: res.statusCode
    });
  });

  next();
};

export const metricsEndpoint = async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
};
