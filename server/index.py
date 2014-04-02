#!/usr/bin/env python3
from flask import Flask, request, session, jsonify
import plyvel
import json
import os

from dao import LevelDB

app = Flask(__name__)
db = LevelDB(plyvel.DB(os.path.join(os.path.dirname(__file__), 'db'), create_if_missing=True))

@app.route('/projects/new', methods=['POST'])
def new_project():
    data = request.files['file']
    name = request.form['name']
    id = db.new_project(name, data)
    return jsonify(id=id, name=name)

@app.route('/projects/', methods=['GET'])
def list_projects():
    return jsonify(names=db.list_projects())

@app.route('/project/<int:id>/name', methods=['POST'])
def update_name(id):
    db.update_name(id, request.form['name'])
    return flask.Response(status=204)

@app.route('/project/<int:id>/data', methods=['POST'])
def update_data(id):
    training_data = db.update_data(id, request.files['file'])
    # recalculate the training_data
    return jsonify(training_data)



# vim: et sw=4 sts=4
