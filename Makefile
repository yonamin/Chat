lint-frontend:
		make -C frontend lint
install:
		npm ci

start-frontend:
		make -C frontend start

start-backend:
		npx start-server -s ./frontend/build

start:
		make start-backend

build:
		rm frontend/build -rf
		npm run build