
dev:
	docker compose  -f docker-compose.dev.yml up
dev_down: 
	docker compose  -f docker-compose.dev.yml down
dev_stop: 
	docker compose  -f docker-compose.dev.yml stop
dev_sh:
	docker exec -it app /bin/sh

prod:
	docker compose  -f docker-compose.prod.yml up --build -d
prod_down: 
	docker compose  -f docker-compose.prod.yml down
prod_stop: 
	docker compose  -f docker-compose.prod.yml stop
# Variables
sh_app:
	docker exec -it app /bin/sh

sh_db:
	docker exec -it app-mysql /bin/sh
