import json

import googlemaps

from dist2coords import dist2coords


with open('keys.json', 'r') as file:
	KEY = json.loads(file.read())['google']['maps']['key']

with open('categories.json', 'r') as file:
	CATEGORIES = json.loads(file.read())

gmaps = googlemaps.Client(key=KEY)


def handler(emojis, time, geo):
	points = []

	for emoji in emojis:
		# Преобразование в категории

		if emoji not in CATEGORIES:
			continue

		category = CATEGORIES[emoji]

		# Время в расстояние

		radius = dist2coords(80 * time) # m/min * min -> geo dist # 85

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

		geo = place['candidates'][0]['geometry']['location'] # Обновляем текущее местоположение

		points.append({
			'id': place['candidates'][0]['place_id'],
			'name': place['candidates'][0]['name'],
			'geo': place['candidates'][0]['geometry']['location'],
			'emoji': emoji,
		})

	return points