import json
import random

import googlemaps

from dist2coords import dist2coords


with open('keys.json', 'r') as file:
	KEY = json.loads(file.read())['google']['maps']['key']

with open('categories.json', 'r') as file:
	CATEGORIES = json.loads(file.read())

gmaps = googlemaps.Client(key=KEY)


def handler(emojis, time, geo):
	points = []

	# Выборка эмодзи

	emojis = list(emojis)

	o = 0
	while len(emojis) > o:
		if emojis[o] not in CATEGORIES:
			del emojis[o]
		else:
			o += 1

	random.shuffle(emojis)

	if len(emojis) > 3:
		emojis = emojis[:3]
	
	# ! Учитывать время в каждой точке

	#

	for emoji in emojis:
		# Преобразование в категории

		category = CATEGORIES[emoji]

		# Время в расстояние

		radius = dist2coords(85 * time) # m/min * min -> geo dist # 80

		# Преобразование в места

		place = gmaps.find_place(
			category,
			'textquery',
			fields=[
				'place_id',
				'geometry/location',
				'name',
			],
			location_bias='circle:{}@{},{}'.format(radius, geo['lat'], geo['lng']),
		)

		places = gmaps.places_nearby(
			location=(geo['lat'], geo['lng']),
			radius=radius,
			keyword = category,
		)['results']

		# ! Если ни одного места?

		place = places[random.randint(0, len(places)-1)]

		geo = place['geometry']['location'] # Обновляем текущее местоположение

		points.append({
			'id': place['place_id'],
			'name': place['name'],
			'geo': place['geometry']['location'],
			'emoji': emoji,
		})

	return points