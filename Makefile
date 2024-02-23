start-frontend:
	npm -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

build:
	rm frontend/build -rf
	npm run build