import json

import googlemaps


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

		# Преобразование в места

		place = gmaps.find_place(
			category,
			'textquery',
			fields=[
				'geometry/location',
				'name',
				# 'formatted_address',
				# 'photos',
				# 'price_level',
				# 'rating',
			],
			location_bias='circle:0.5@{},{}'.format(geo['lat'], geo['lng']),
		)

		geo = place['candidates'][0]['geometry']['location'] # Обновляем текущее местоположение

		points.append({
			'geo': place['candidates'][0]['geometry']['location'],
			'name': place['candidates'][0]['name'],
			'emoji': emoji,
		})


	return points