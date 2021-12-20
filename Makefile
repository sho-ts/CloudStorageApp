up:
	docker-compose -f docker-compose.local.yml up -d

down: 
	docker-compose -f docker-compose.local.yml down

restart:
	@make down
	@make up

ps:
	docker-compose ps

logs:
	docker-compose logs

build:
	docker-compose build -f docker-compose.local.yml --no-cache

api:
	docker-compose exec api sh

app:
	docker-compose exec app sh

dev:
	cd frontend && yarn dev