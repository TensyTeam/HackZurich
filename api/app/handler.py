import json
import random

import googlemaps


with open('keys.json', 'r') as file:
	KEY = json.loads(file.read())['google']['maps']['key']

with open('categories.json', 'r') as file:
	CATEGORIES = json.loads(file.read())

gmaps = googlemaps.Client(key=KEY)


def handler(emojis, time, geo):
	points = []
	ids = set()

	# Выборка эмодзи

	emojis = list(emojis)

	o = 0
	while len(emojis) > o:
		if emojis[o] not in CATEGORIES:
			del emojis[o]
		else:
			o += 1

	random.shuffle(emojis)

	# Время в расстояние

	# ! Учитывать время в каждой точке
	radius = 2.5 * time # m/min * min -> geo dist # 85
	geo_start = geo
	radius_delta = 0

	print('r=', radius)

	#

	for emoji in emojis:
		# Ограничение, если слишком длинный путь

		if len(points) > 2:
			break

		# Преобразование в категории

		category = CATEGORIES[emoji]

		# Преобразование в места

		# place = gmaps.find_place(
		# 	category,
		# 	'textquery',
		# 	fields=[
		# 		'place_id',
		# 		'geometry/location',
		# 		'name',
		# 	],
		# 	location_bias='circle:{}@{},{}'.format(radius, geo['lat'], geo['lng']),
		# )

		places = gmaps.places_nearby(
			location=(geo['lat'], geo['lng']),
			radius=radius,
			keyword = category,
		)['results']


		o = 0
		while len(places) > o:
			# Если уже было такое место

			if places[o]['place_id'] in ids:
				del places[o]
				continue

			# Если место в обратной стороне

			if len(points) >= 1 and ((geo_start['lat'] - places[o]['geometry']['location']['lat']) ** 2 + (geo_start['lng'] - places[o]['geometry']['location']['lng']) ** 2) <= radius_delta:
				del places[o]
				continue

			# # Слишком близко

			# if ((geo['lat'] - places[o]['geometry']['location']['lat']) ** 2 + (geo['lng'] - places[o]['geometry']['location']['lng']) ** 2) ** 0.5 <= 0.01:
			# 	del places[o]
			# 	continue

			#

			o += 1

		# Если ни одного места

		if not len(places):
			continue

		# Выбор конкретного места

		place = places[random.randint(0, len(places)-1)]

		geo = place['geometry']['location'] # Обновляем текущее местоположение
		radius_delta = ((geo_start['lat'] - place['geometry']['location']['lat']) ** 2 + (geo_start['lng'] - place['geometry']['location']['lng']) ** 2)

		points.append({
			'id': place['place_id'],
			'name': place['name'],
			'geo': place['geometry']['location'],
			'emoji': emoji,
		})

	return points