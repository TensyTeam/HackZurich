import json

from flask import request, jsonify

from app import app
from app.handler import handler


@app.route('/test', methods=['GET', 'POST'])
@app.route('/test/', methods=['GET', 'POST'])
def test():
	# Обработка запроса

	# emoji = request.args.get('emoji')
	# time = request.args.get('time')
	# geo = request.args.get('geo')
	x = request.json
	print(x)

	return json.dumps(
		handler('🍩🌃🍺🍽🛏', 180, {'lat': 47.390325, 'lng': 8.515934}),
		ensure_ascii=False,
		indent='\t',
	)

@app.route('/', methods=['GET', 'POST'])
def route():
	# Обработка запроса

	# emoji = request.args.get('emoji')
	# time = request.args.get('time')
	# geo = request.args.get('geo')
	x = request.json

	print(x) # !


	# Обработка

	points = handler(x['emoji'], x['time'], x['geo'])


	# Ответ

	res = {
		'points': points,
	}

	return json.dumps(res, ensure_ascii=False, indent='\t')