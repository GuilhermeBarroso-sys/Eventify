
dev:
	docker compose  -f docker-compose.dev.yml up
prod:
	docker compose  -f docker-compose.prod.yml up --build -d
# Variables
sh_app:
	docker exec -it app /bin/sh

sh_db:
	docker exec -it app-mysql /bin/sh
