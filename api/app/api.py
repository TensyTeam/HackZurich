from flask import request, jsonify
from app import app


@app.route('/')
def get():
	emoji = request.args.get('emoji')
	time = request.args.get('time')
	# x = request.json

	print(emoji, time)

	res = {
		'coords': [
			(47.23, 25.44),
			(47.235, 25.43),
			(47.232, 25.435),
		],
	}

	return jsonify(res)