#!/bin/bash

# Environment variables
export NODE_ENV=production
export JWT_SECRET=$(openssl rand -hex 32)
export MONGO_ROOT_PASSWORD=$(openssl rand -hex 16)
export GRAFANA_PASSWORD=$(openssl rand -hex 16)

# Create directories
mkdir -p logs
mkdir -p data/mongo
mkdir -p data/grafana

# Build and start services
docker-compose down
docker-compose build
docker-compose up -d

# Initialize MongoDB
docker-compose exec mongo mongosh -u root -p $MONGO_ROOT_PASSWORD --eval "
  db = db.getSiblingDB('robovestx');
  db.createUser({
    user: 'robovestx',
    pwd: '$MONGO_ROOT_PASSWORD',
    roles: [{ role: 'readWrite', db: 'robovestx' }]
  });
"

# Wait for services to initialize
sleep 30

# Run database migrations and seeders
docker-compose exec backend node scripts/migrate.js
docker-compose exec backend node scripts/seed.js

# Configure Grafana
docker-compose exec grafana grafana-cli admin reset-admin-password $GRAFANA_PASSWORD

echo "Deployment completed successfully!"
echo "Access the application at: http://your-server-ip:3000"
echo "Grafana dashboard: http://your-server-ip:3001 (admin/$GRAFANA_PASSWORD)"
