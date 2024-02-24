lint-frontend:
		make -C frontend lint
install:
		npm ci

start-frontend:
		make -C frontend start

start-backend:
		npx start-server -s ./frontend/build -p 5001

start:
		make start-backend & make start-frontend

build:
		rm frontend/build -rf
		npm run build