python manage.py flush --noinput
echo y | python manage.py migrate
::python manage.py loaddata json_file.json