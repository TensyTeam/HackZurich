import json

from flask import request, jsonify
import googlemaps

from app import app


with open('keys.json', 'r') as file:
	KEY = json.loads(file.read())['google']['maps']['key']

with open('categories.json', 'r') as file:
	CATEGORIES = json.loads(file.read())


@app.route('/', methods=['GET', 'POST'])
def route():
	# Обработка запроса

	# emoji = request.args.get('emoji')
	# time = request.args.get('time')
	# geo = request.args.get('geo')
	x = request.json

	print(x) # !


	# Преобразование в категории

	categories = []
	emoji_available = []

	for emoji in x['emoji']:
		if emoji in CATEGORIES:
			emoji_available.append(emoji)
			categories.append(CATEGORIES[emoji])


	# Преобразование в места

	gmaps = googlemaps.Client(key=KEY)

	# # Координаты по адресу
	# geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')
	# print(geocode_result)

	# # Адрес по координатам
	# reverse_geocode_result = gmaps.reverse_geocode((40.714224, -73.961452))
	# print(reverse_geocode_result)

	# # Маршрут
	# now = datetime.now()
	# directions_result = gmaps.directions("Sydney Town Hall", "Parramatta, NSW", mode="transit", departure_time=now)
	# print(directions_result)

	# # Матрица расстояний
	# origins = ["Perth, Australia", "Sydney, Australia", "Melbourne, Australia", "Adelaide, Australia"]
	# destinations = ["Blue Mountains, Australia", "Bungle Bungles, Australia", "The Pinnacles, Australia"]
	# print(gmaps.distance_matrix(origins, destinations))

	points = []

	for index, category in enumerate(categories):
		# Место в радиусе
		place = gmaps.find_place(
			category,
			'textquery',
			fields=['geometry/location', 'name'],
			location_bias='circle:0.5@{},{}'.format(x['geo']['lat'], x['geo']['lng']),
		)

		points.append({
			'geo': place['candidates'][0]['geometry']['location'],
			'name': place['candidates'][0]['name'],
			'emoji': emoji_available[index],
		})


	# Ответ

	res = {
		'points': points,
	}

	return json.dumps(res, ensure_ascii=False, indent='\t')