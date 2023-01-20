init:
	docker network create shared || true
	$(MAKE) build-modules

build-modules:
	docker-compose run api yarn install
	docker-compose run app yarn install

rebuild:
	docker-compose build

up:
	docker-compose up

down: 
	docker-compose down
