.PHONY: help install lint format test run migrations migrate seed clean

help:
	@echo "Available commands:"
	@echo "  make install      - Install dependencies"
	@echo "  make lint         - Run linting checks (flake8)"
	@echo "  make format       - Format code with black and isort"
	@echo "  make test         - Run tests with pytest"
	@echo "  make run          - Run development server"
	@echo "  make migrate      - Run migrations"
	@echo "  make clean        - Clean up temporary files"

install:
	pip install -r requirements.txt

lint:
	flake8 .

format:
	isort .
	black .

test:
	pytest

run:
	python manage.py runserver

migrate:
	python manage.py makemigrations
	python manage.py migrate

clean:
	find . -type f -name '*.pyc' -delete
	find . -type d -name '__pycache__' -delete
	find . -type d -name '.pytest_cache' -delete
	find . -type d -name '*.egg-info' -delete
	rm -rf build dist htmlcov .coverage
