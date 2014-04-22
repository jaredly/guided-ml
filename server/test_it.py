#!/usr/bin/env python

from app import make_app
import json
# from StringIO import StringIO
from io import BytesIO
from zipfile import ZipFile

def make_example_zipfile():
    text = 'a,b,c\n1,2,3\n2,3,4\n0,0,0'
    meta = 'person=jared\nawesome=true'
    sio = BytesIO()
    zf = ZipFile(sio, 'w')
    zf.writestr('one-0.csv', text)
    zf.writestr('one-0.meta', meta)
    zf.close()
    sio.seek(0)
    return sio

import pytest

@pytest.fixture
def app():
    app = make_app()
    app.config['TESTING'] = True
    return app.test_client()

def test_get_empty_projects(app):
    rv = app.get('/project/')
    assert rv.status_code == 200
    data = json.loads(rv.data.decode('utf8'))
    assert len(data['names']) == 0

def test_add_project(app):
    rv = app.post('/project/new', data=dict(
        file=(make_example_zipfile(), 'notazip.zip'),
        name='The best'
    ))
    assert rv.status_code == 200

@pytest.fixture
def p_app(app):
    rv = app.post('/project/new', data=dict(
        file=(make_example_zipfile(), 'notazip.zip'),
        name='The best'
    ))
    return app

class TestGetFeatures:
    def test_get_feature_output(self, p_app):
        rv = p_app.get('/project/0/feature/all')
        assert rv.status_code == 200
        data = json.loads(rv.data.decode('utf8'))
        assert data['features'] == []
        assert data['data'] == [[0, 'one']]
        assert data['headers'] == ['a', 'b', 'c']
        assert data['classes'] == ['one']

    def test_get_name(self, p_app):
        rv = p_app.get('/project/0/name')
        assert rv.status_code == 200
        data = json.loads(rv.data.decode('utf8'))
        assert data['name'] == 'The best'

class TestProjectStuff:
    def test_get_project(self, p_app):
        rv = p_app.get('/project/0')
        data = json.loads(rv.data.decode('utf8'))
        assert data['data']['name'] == 'The best'
        assert data['data']['features'] == {}
        assert data['data']['learners'] == {}
        assert data['data']['headers'] == ['a', 'b', 'c']
        assert data['data']['raw_data'][0] == {
            'class': 'one',
            'data': [
                [1, 2, 3],
                [2, 3, 4],
                [0, 0, 0]
            ],
            'filename': 'one-0.csv',
            'has_img': False,
            'has_vid': False,
            'id': 0,
            'meta': {'awesome': 'true', 'person': 'jared'}
        }

    def test_add_feature(self, p_app):
        rv = p_app.post('/project/0/feature/new', data=json.dumps(dict(
            name='Awesome',
            type='average',
            args={'dimension': 'b'}
        )), content_type='application/json')
        assert rv.status_code == 200
        data = json.loads(rv.data.decode('utf8'))
        assert data['feature_column'] == [5/3.0]

        rv = p_app.delete('/project/0/feature/0')
        assert rv.status_code == 204

    def test_add_custom(self, p_app):
        rv = p_app.post('/project/0/feature/new', data=json.dumps(dict(
            name='Mything',
            type='custom',
            args={'code': 'output = 34'}
        )), content_type='application/json')
        assert rv.status_code == 200
        data = json.loads(rv.data.decode('utf8'))
        assert data['feature_column'] == [34]


# vim: et sw=4 sts=4
