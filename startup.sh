#!/bin/bash
set -e

echo "=== Starting Docker Compose services (Backend & Root) ==="

# 1. Start backend docker-compose (e.g., Keycloak, DB)
if [ -f "fall-insurance-backend/docker-compose.yml" ]; then
    echo "--> Building and starting backend services..."
    docker compose -f fall-insurance-backend/docker-compose.yml up --build -d
fi

# 2. Start root docker-compose
if [ -f "docker-compose.yml" ]; then
    echo "--> Building and starting root services..."
    docker compose up --build -d
fi

echo "=== All services have been successfully started! ==="

