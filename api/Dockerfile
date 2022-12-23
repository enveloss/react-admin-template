FROM python:3.8.16-buster

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD [ "uvicorn", "app:app", "--port", "80", "--host", "0.0.0.0" ]