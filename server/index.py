#!/usr/bin/env python3
from flask import Flask, request, session, jsonify
import plyvel
import json
import os

from dao import DAO
from levelpl import LevelPL

app = Flask(__name__)
dao = DAO(LevelPL())

@app.route('/project/new', methods=['POST'])
def new_project():
    data = request.files['file']
    name = request.form['name']
    id = dao.new_project(name, data)
    return jsonify(id=id, name=name)

@app.route('/project/', methods=['GET'])
def list_projects():
    return jsonify(names=dao.list_projects())

@app.route('/project/<int:id>/name', methods=['POST'])
def update_name(id):
    dao.update_name(id, request.json['name'])
    return flask.Response(status=204)

@app.route('/project/<int:id>/data', methods=['POST'])
def update_data(id):
    raw_data, training_data = dao.update_data(id, request.files['file'])
    return jsonify(raw_data=raw_data, training_data=training_data)

@app.route('/project/<int:id>/feature/new', methods=['POST'])
def new_feature(id):
    name = request.json['name']
    type = request.json['type']
    args = request.json['args']
    fid, feature_column = dao.add_feature(id, name, type, args)
    return jsonify(fid=id, feature_column=feature_column)

@app.route('/project/<int:id>/feature/<int:fid>/name', method=['POST']))
def update_feature_name(id, fid):
    feature_column = dao.update_feature_name(id, fid, request.json['name'])
    return jsonify(feature_column=feature_column)

@app.route('/project/<int:id>/feature/<int:fid>/args', method=['POST']))
def update_feature_args(id, fid):
    feature_column = dao.update_feature_args(id, fid, request.json['args'])
    return jsonify(feature_column=feature_column)




# vim: et sw=4 sts=4
