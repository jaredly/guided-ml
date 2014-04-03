#!/usr/bin/env python3
from flask import Flask, request, session, jsonify
import plyvel
import json
import os

from dao import DAO
from levelpl import LevelPL
from mempl import MemPL

app = Flask(__name__)
dao = DAO(MemPL())

def get(route):
    return app.route(route, methods=['GET'])

def delete(route):
    return app.route(route, methods=['DELETE'])

def post(route):
    return app.route(route, methods=['POST'])

## Projcts

@post('/project/new')
def new_project():
    data = request.files['file']
    name = request.form['name']
    id = dao.new_project(name, data)
    # return jsonify(id=id, name=name)
    fail # return a redirect?

@get('/project/')
def list_projects():
    return jsonify(names=dao.list_projects())

@get('/project/<int:id>')
def get_project(id):
    return jsonify(data=dao.get_project(id))

@post('/project/<int:id>/name')
def update_name(id):
    dao.update_name(id, request.json['name'])
    return flask.Response(status=204)

@post('/project/<int:id>/data')
def update_data(id):
    raw_data, training_data = dao.update_data(id, request.files['file'])
    return jsonify(raw_data=raw_data, training_data=training_data)

## Features

@post('/project/<int:id>/feature/new')
def new_feature(id):
    name = request.json['name']
    type = request.json['type']
    args = request.json['args']
    fid, feature_column = dao.add_feature(id, name, type, args)
    return jsonify(fid=id, feature_column=feature_column)

@delete('/project/<int:id>/feature/<int:fid>')
def update_feature_name(id, fid):
    dao.remove_feature(id, fid)
    return flask.Response(status=204)

@post('/project/<int:id>/feature/<int:fid>/name')
def update_feature_name(id, fid):
    feature_column = dao.update_feature_name(id, fid, request.json['name'])
    return jsonify(feature_column=feature_column)

@post('/project/<int:id>/feature/<int:fid>/args')
def update_feature_args(id, fid):
    feature_column = dao.update_feature_args(id, fid, request.json['args'])
    return jsonify(feature_column=feature_column)

## Learners

@post('/project/<int:id>/learner/<int:fid>/args')
def new_learner(id):
    pass



# vim: et sw=4 sts=4
