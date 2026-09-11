curl -X POST "http://localhost:8080/realms/fall-insurance/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=fall-insurance-frontend" \
  -d "username=edoardo" \
  -d "password=admin" \
  -d "grant_type=password"

