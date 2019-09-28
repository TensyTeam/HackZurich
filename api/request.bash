# POST, локально, запрос

curl -X POST -H "Content-Type: application/json" -d '{"emoji": "🍩🌃🍺", "time": 180, "geo": {"lat": 47.390325, "lng": 8.515934}}' http://127.0.0.1:5201/

# GET, локально, запрос

curl -X GET -H "Content-Type: application/json" -d '{"emoji": "🍩🌃🍺", "time": 180, "geo": {"lat": 47.390325, "lng": 8.515934}}' http://127.0.0.1:5201/

# POST, локально, тест

curl -X POST http://127.0.0.1:5201/test/

# POST, глобально, запрос

curl -X POST -H "Content-Type: application/json" -d '{"emoji": "🍩🌃🍺", "time": 180, "geo": {"lat": 47.390325, "lng": 8.515934}}' https://zurich.kosyachniy.com/

# GET, глобально, запрос

curl -X GET -H "Content-Type: application/json" -d '{"emoji": "🍩🌃🍺", "time": 180, "geo": {"lat": 47.390325, "lng": 8.515934}}' https://zurich.kosyachniy.com/

# POST, глобально, тест

curl -X POST https://zurich.kosyachniy.com/test/