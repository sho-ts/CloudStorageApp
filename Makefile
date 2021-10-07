.PHONY: api
.PHONY: app

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

api:
	docker-compose exec api sh

app:
	docker-compose exec app sh