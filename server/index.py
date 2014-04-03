#!/usr/bin/env python3
from flask import Flask, request, jsonify, make_response
import flask
import time

from dao import DAO
# from levelpl import LevelPL
from mempl import MemPL

app = Flask(__name__)
dao = DAO(MemPL())

req = request

def get(route):
    return app.route(route, methods=['GET'])

def delete(route):
    return app.route(route, methods=['DELETE'])

def post(route):
    return app.route(route, methods=['POST'])

## Projcts

@post('/project/new')
def new_project():
    data = req.files['file']
    name = req.form['name']
    dao.new_project(name, data)
    return flask.redirect('/')
    # return flask.Response(status=204)
    # return jsonify(id=id, name=name)
    # fail # return a redirect?

@get('/project/')
def list_projects():
    return jsonify(names=dao.list_projects())

@get('/project/<int:id>')
def get_project(id):
    return jsonify(data=dao.get_project(id))

@post('/project/<int:id>/name')
def update_name(id):
    dao.update_name(id, req.json['name'])
    return flask.Response(status=204)

@post('/project/<int:id>/data')
def update_data(id):
    raw_data, training_data = dao.update_data(id, req.files['file'])
    return jsonify(raw_data=raw_data, training_data=training_data)

## Features

@post('/project/<int:id>/feature/new')
def new_feature(id):
    name = req.json['name']
    type = req.json['type']
    args = req.json['args']
    fid, feature_column, feature = dao.add_feature(id, name, type, args)
    return jsonify(fid=fid, feature_column=feature_column, feature=feature)

@delete('/project/<int:id>/feature/<int:fid>')
def remove_feature(id, fid):
    dao.remove_feature(id, fid)
    return flask.Response(status=204)

@post('/project/<int:id>/feature/<int:fid>/name')
def update_feature_name(id, fid):
    dao.update_feature_name(id, fid, req.json['name'])
    return flask.Response(status=204)

@post('/project/<int:id>/feature/<int:fid>/args')
def update_feature_args(id, fid):
    feature_column = dao.update_feature_args(id, fid, req.json['args'])
    return jsonify(feature_column=feature_column)

## Learners

@post('/project/<int:id>/learner/new')
def new_learner(id):
    name = req.json['name']
    type = req.json['type']
    args = req.json['args']
    lid = dao.add_learner(id, name, type, args)
    return jsonify(lid=lid)

@post('/project/<int:id>/learner/<int:lid>')
def update_learner(id, lid):
    name = req.json.get('name', None)
    args = req.json.get('args', None)
    dao.update_learner(id, lid, name, args)
    return flask.Response(status=204)

@post('/project/<int:id>/train/all')
def train_all(id):
    start = time.time()
    confusions = dao.train_all(id)
    dur = time.time() - start
    return jsonify(time=dur, confusions=confusions)

@post('/project/<int:id>/train/<int:lid>')
def train_one(id, lid):
    start = time.time()
    confusion = dao.train(id, lid)
    dur = time.time() - start
    return jsonify(time=dur, confusion=confusion)

@get('/project/<int:id>/compiled/<int:lid>/<target>')
def get_compiled(id, target, lid):
    if not dao.has_target(target):
        return flask.Response('Cannot compile to that target', status=404)
    text, filename = dao.get_compiled(id, lid, target)
    res = make_response(text, 200)
    res.headers['Content-type'] = 'application/data'
    return res

@get('/project/<int:id>/img/<int:instid>')
def get_img(id, instid):
    data = dao.get_img(id, instid)
    res = make_response(data, 200)
    res.headers['Content-type'] = 'image/png'
    return res

@get('/project/<int:id>/vid/<int:instid>')
def get_vid(id, instid):
    data = dao.get_vid(id, instid)
    res = make_response(data, 200)
    res.headers['Content-type'] = 'video/webm'
    return res




# vim: et sw=4 sts=4
