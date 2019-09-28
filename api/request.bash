curl -X POST -H "Content-Type: application/json" -d '{"emoji": "🍩🌃🍺", "time": 180, "geo": {"lat": 47.390325, "lng": 8.515934}}' http://127.0.0.1:5201/

curl -X GET -H "Content-Type: application/json" -d '{"emoji": "🍩🌃🍺", "time": 180, "geo": {"lat": 47.390325, "lng": 8.515934}}' http://127.0.0.1:5201/

curl -X POST -H "Content-Type: application/json" -d '{"emoji": "🍩🌃🍺", "time": 180, "geo": {"lat": 47.390325, "lng": 8.515934}}' https://zurich.kosyachniy.com/

curl -X GET -H "Content-Type: application/json" -d '{"emoji": "🍩🌃🍺", "time": 180, "geo": {"lat": 47.390325, "lng": 8.515934}}' https://zurich.kosyachniy.com/