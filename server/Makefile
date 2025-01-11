include .env
export $(shell sed 's/=.*//' .env)

run-dev:
	npm run start:dev
compose:
	docker-compose -f ./docker-compose.yml up -d --force-recreate
migrate:
	NODE_ENV=production npx sequelize-cli db:migrate
run-tests:
	npm run test:e2e