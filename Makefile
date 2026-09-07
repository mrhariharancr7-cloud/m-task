.PHONY: frontend backend dev

frontend:
	@echo "Running frontend..."
	cd frontend && npm run dev

backend:
	@echo "Running backend"
	cd backend && node Server.js

dev:
	@echo "Running both services"
	$(MAKE) frontend & $(MAKE) backend & wait
