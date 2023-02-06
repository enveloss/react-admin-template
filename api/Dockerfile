FROM python:3.9.16-slim-buster

WORKDIR /app

COPY ./api ./api
COPY ./db_toolkit ./db_toolkit

WORKDIR /app/api/src

RUN pip install poetry 
RUN poetry install 

CMD [ "poetry", "run", "prod" ]