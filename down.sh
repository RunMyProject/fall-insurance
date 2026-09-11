#!/bin/bash
set -e

echo "=== Stopping Docker Compose services ==="

# 1. Stop root docker-compose services
if [ -f "docker-compose.yml" ]; then
    echo "--> Stopping root services..."
    docker compose down
fi

# 2. Stop backend docker-compose services
if [ -f "fall-insurance-backend/docker-compose.yml" ]; then
    echo "--> Stopping backend services..."
    docker compose -f fall-insurance-backend/docker-compose.yml down
fi

echo "=== All containers have been stopped. ==="
