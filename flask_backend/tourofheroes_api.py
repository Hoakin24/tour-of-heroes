from flask import Flask, request, jsonify
from flask_cors import CORS 
from json import load, dump

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

f = open("heroes.json")

all_heroes = load(f)

@app.route('/heroes', methods=["GET", "POST"])
def heroes():
    if request.method == "POST":
        data = request.get_json(force=True)
        max_id = 0
        for h in all_heroes:
            if int(h['id']) > max_id:
                max_id = int(h['id'])
        max_id += 1
        hero = {'id': max_id, 'name': data['name']}
        all_heroes.append(hero)
        f = open("heroes.json", "w")
        dump(all_heroes, f)
        f.close()
        return all_heroes
    else:
        return all_heroes

@app.route('/delete/<id>', methods=["DELETE"])
def delete(id):
    if request.method == "DELETE":
        for h in all_heroes.copy():
            if int(h['id']) == int(id):
                all_heroes.remove(h)
                f = open("heroes.json", "w")
                dump(all_heroes, f)
                f.close()
                break

@app.route('/details/<id>', methods=["GET", "PUT"])
def detail(id): 
    if request.method == "PUT":
        data = request.get_json(force=True)
        for h in all_heroes:
            if h['id'] == data['id']:
                h['name'] = data['name']
                f = open("heroes.json", "w")
                dump(all_heroes, f)
                f.close()
                return h
    else:
        for h in all_heroes:
            if int(h['id']) == int(id):
                return h
        return 'Hero not found', 400

@app.route('/heroes/', methods=["GET"])
def search():
    q = request.args.get('name')
    heroes = []
    for h in all_heroes:
        if q.lower() in h['name'].lower():
            heroes.append(h)
    return jsonify(heroes)

app.run()