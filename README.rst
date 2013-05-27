Installation
============

::

  # Create new virtualenv
  pip install -r requirements.txt
  ./manage.py syncdb
  ./manage.py loaddata demo_data.json
  ./manage.py runserver
  # Go to http://localhost:8000


Test Credentials
================

::

  username: user1
  password: user1
  apikey: 618a8ad5cc54418f0eaa856e09af8ab405608c61

  username: user2
  password: user2
  apikey: b88dcbd63543e2c74f19cfff3db8b95296dd28eb


API Interaction Examples
========================

::

  curl 'http://localhost:8000/api/entry/?username=user1&api_key=618a8ad5cc54418f0eaa856e09af8ab405608c61&format=json'
  curl 'http://localhost:8000/api/entry/7/?username=user1&api_key=618a8ad5cc54418f0eaa856e09af8ab405608c61&format=json'
  curl --dump-header - -H "Content-Type: application/json" -X POST --data '{"text": "Hello World!", "due_date": "2013-05-27 20:25", "priority": 10}' 'http://localhost:8000/api/entry/?username=user1&api_key=618a8ad5cc54418f0eaa856e09af8ab405608c61'


.. image:: http://f.cl.ly/items/3h090P2Y443b1P3k3w1N/Screen%20Shot%202013-05-27%20at%2019.35.43.png
