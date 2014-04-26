#!/usr/bin/env python3
from flask import Flask, Config, request, jsonify, make_response
import cPickle
from os.path import join, dirname, exists
from threading import Timer
from functools import wraps
import flask
import time

import package
from dao import DAO
# from levelpl import LevelPL
from mempl import MemPL

PICKLE_PATH = join(dirname(__file__), 'dump.pck')

def make_app(persist=True):
    req = request
    app = Flask(__name__)
    if persist and exists(PICKLE_PATH):
        try:
            pl = cPickle.load(open(PICKLE_PATH))
        except Exception as e:
            pl = MemPL()
    else:
        pl = MemPL()
    dao = DAO(pl)

    def dump_pl():
        with open(PICKLE_PATH, 'wb') as fp:
            cPickle.dump(pl, fp)

    # @app.after_request
    def dump_after():
        if persist:
            t = Timer(.1, dump_pl)
            t.start()

    def get(route):
        return app.route(route, methods=['GET'])

    def delete(route):
        return app.route(route, methods=['DELETE'])

    def post(route):
        def dec(fn):
            @wraps(fn)
            def meta(*a, **b):
                res = fn(*a, **b)
                dump_after()
                return res
            return app.route(route, methods=['POST'])(meta)
        return dec

    @get('/')
    def index():
        return flask.redirect('/static/index.html')

    ## Misc

    @get('/features')
    def get_features():
        return jsonify(features=utils.list_features())

    @get('/learners')
    def get_learner():
        return jsonify(learners=utils.list_learners())

    ## Projcts

    @post('/project/new')
    def new_project():
        data = req.files['file']
        name = req.form['name']
        id = dao.new_project(name, data)
        return jsonify(id=id, name=name)

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

    @get('/project/<int:id>/name')
    def get_name(id):
        return jsonify(name=dao.get_name(id))

    @post('/project/<int:id>/data')
    def update_data(id):
        raw_data, training_data = dao.update_data(id, req.files['file'])
        return jsonify(raw_data=raw_data, training_data=training_data)

    ## Features

    @get('/project/<int:id>/feature/all')
    def feature_output(id):
        return jsonify(**dao.get_feature_output(id))

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

    @post('/project/<int:id>/feature/<int:fid>')
    def update_feature(id, fid):
        feature_column = dao.update_feature(id, fid, req.json)
        return jsonify(feature_column=feature_column)

    @post('/project/<int:id>/feature/<int:fid>/args')
    def update_feature_args(id, fid):
        feature_column = dao.update_feature_args(id, fid, req.json['args'])
        return jsonify(feature_column=feature_column)

    ## Learners

    @get('/project/<int:id>/learner/all')
    def all_learners(id):
        return jsonify(**dao.get_learner_output(id))

    @post('/project/<int:id>/learner/new')
    def new_learner(id):
        name = req.json['name']
        type = req.json['type']
        args = req.json['args']
        lid, acc, confusion, classes, assignments, learner = dao.add_learner(id, name, type, args)
        return jsonify(lid=lid, accuracy=acc, confusion=confusion, learner=learner, classes=classes, assignments=assignments)

    @post('/project/<int:id>/learner/<int:lid>')
    def update_learner(id, lid):
        name = req.json.get('name', None)
        args = req.json.get('args', None)
        dao.update_learner(id, lid, name, args)
        return flask.Response(status=204)

    @delete('/project/<int:id>/learner/<int:fid>')
    def remove_learner(id, fid):
        dao.remove_learner(id, fid)
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

    '''
    @get('/project/<int:id>/compiled/<int:lid>/<target>')
    def get_compiled(id, target, lid):
        if not dao.has_target(target):
            return flask.Response('Cannot compile to that target', status=404)
        text, filename = dao.get_compiled(id, lid, target)
        res = make_response(text, 200)
        res.headers['Content-type'] = 'application/data'
        return res
    '''

    @get('/project/<int:id>/img/<int:instid>')
    def get_img(id, instid):
        data = dao.get_img(id, instid)
        if not data:
            return make_response('No image', 404)
        res = make_response(data, 200)
        res.headers['Content-type'] = 'image/png'
        return res

    @get('/project/<int:id>/vid/<int:instid>')
    def get_vid(id, instid):
        data = dao.get_vid(id, instid)
        if not data:
            return make_response('No video', 404)
        res = make_response(data, 200)
        res.headers['Content-type'] = 'video/webm'
        return res

    @get('/project/<int:id>/compiled/<int:lid>')
    def get_compiled(id, lid):
        features, trained, learner = dao.trained_learner(id, lid)
        zipfile = package.learner(features, trained, learner)
        res = make_response(zipfile.read(), 200)
        res.headers['Content-type'] = 'application/data' # TODO figure out mimetype
        return res
    
    return app

if __name__ == '__main__':
    make_app().run(debug=True)


# vim: et sw=4 sts=4
