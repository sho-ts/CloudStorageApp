up:
	docker-compose up -d

down: 
	docker-compose down

restart:
	@make down
	@make up

ps:
	docker-compose ps

logs:
	docker-compose logs

build:
	docker-compose build --no-cache

express:
	docker-compose exec express sh

api:
	docker-compose exec api sh

app:
	docker-compose exec app sh

dev:
	cd frontend && yarn dev