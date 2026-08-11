FROM python:3.13-slim

WORKDIR /app

RUN pip install --upgrade pip

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

RUN echo 'alias pm="python manage.py"' >> /root/.bashrc

CMD ["gunicorn", "school_proj.wsgi", "--bind", "0.0.0.0:8000"]