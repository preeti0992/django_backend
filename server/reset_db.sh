python manage.py reset_db --router=default --noinput
yes | python manage.py migrate
#python manage.py loaddata json_file.json