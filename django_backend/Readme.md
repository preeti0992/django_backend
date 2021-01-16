# SETUP

## Setup Django

#### Setup virtual environment
```
pip install virtualenv
virtualenv venv
python3 -m venv venv3
venv3\Scripts\activate.ps1
```

#### Setup virtual environment mac
```
pip install virtualenv
virtualenv venv
source venv/bin/activate
```
Install requirements
```
pip install -r requirements.txt
```

## PSQL Setup on windows

#### Install psql
`scoop install postgresql`

##### pqsl services
start: `pg_ctl start`

stop: `pg_ctl stop`

#### create database setup
```
psql -U postgres -c "create user django with password 'password';"
psql -U postgres -c "alter user django createdb;"
psql -U postgres -c "alter user django set client_encoding to 'utf8';"
psql -U postgres -c "create database rootdb;"
psql -U postgres -c "grant all privileges on database rootdb to django;"
````
#### To start psql console
`psql -U postgres`


## PSQL Setup on mac

#### Install psql
`brew install cmake boost git postgresql python3 js` need to check

#### pqsl services
start: `brew services start postsql`

stop: `brew services stop postsq`

#### Create database setup
`createdb $(whoami)`

```
psql
create user django with password 'password';
alter user django createdb;
alter user django set client_encoding to 'utf8';
create database rootdb
grant all privileges on database rootdb to django;
\q
````

#### To start psql console
`psql`

## Clear db
windows : `reset_db.bat`

mac : `reset_db.sh`


## Create requireents.txt
`pip freeze > requirements.txt`

---------------
## Setup django for new project
```
pip install django
pip install djangorestframework django-cors-headers gunicorn
django-admin startproject django_backend
python manage.py startapp backend
python manage.py migrate
python manage.py runserver
```
