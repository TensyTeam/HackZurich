from flask import request, jsonify
from app import app

import googlemaps
from datetime import datetime


@app.route('/')
def get():
	emoji = request.args.get('emoji')
	time = request.args.get('time')
	geo = request.args.get('geo')
	# x = request.json

	print(emoji, time)


	gmaps = googlemaps.Client(key='AIzaSyD0fd5gEJJVAIvn2lC6eSlK4hrqlSLAkm8')

	# # Geocoding an address
	# geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')
	# print(geocode_result)

	# # Look up an address with reverse geocoding
	# reverse_geocode_result = gmaps.reverse_geocode((40.714224, -73.961452))
	# print(reverse_geocode_result)

	# # Request directions via public transit
	# now = datetime.now()
	# directions_result = gmaps.directions("Sydney Town Hall", "Parramatta, NSW", mode="transit", departure_time=now)
	# print(directions_result)

	print(gmaps.find_place('restaurant', 'textquery', fields=['geometry/location', 'id', 'name'], location_bias='circle:0.5@47.390325,8.515934'))

	origins = ["Perth, Australia", "Sydney, Australia", "Melbourne, Australia", "Adelaide, Australia"]
	destinations = ["Blue Mountains, Australia", "Bungle Bungles, Australia", "The Pinnacles, Australia"]
	print(gmaps.distance_matrix(origins, destinations))


	res = {
		'coords': [
			(47.23, 25.44),
			(47.235, 25.43),
			(47.232, 25.435),
		],
	}

	return jsonify(res)