# Makefile to simplify Docker container management

# Variables
sh_app:
	docker exec -it app /bin/sh

sh_db:
	docker exec -it app-mysql /bin/sh
