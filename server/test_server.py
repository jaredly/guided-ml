#!/usr/bin/env python

from index import app
from pyvows import Vows, expect
import json
# from StringIO import StringIO
from io import BytesIO
from zipfile import ZipFile

def make_example_zipfile():
    text = 'a,b,c\n1,2,3\n2,3,4\n0,0,0'
    meta = 'person=jared\nawesome=true'
    sio = BytesIO()
    zf = ZipFile(sio, 'w')
    zf.writestr('one.csv', text)
    zf.writestr('one.meta', meta)
    zf.close()
    sio.seek(0)
    return sio

@Vows.batch
class MyApp(Vows.Context):
    def topic(self):
        app.config['TESTING'] = True
        return app.test_client()

    def should_get_empty_projects(self, topic):
        rv = topic.get('/project/')
        expect(rv.status_code).to_equal(200)
        data = json.loads(rv.data)
        expect(data['names']).to_length(0)

    class CanMakeProject(Vows.Context):
        def topic(self, a):
            return a

        def can_make_project(self, app):
            rv = app.post('/project/new', data=dict(
                file=(make_example_zipfile(), 'notazip.zip'),
                name='The best'
            ))
            expect(rv.status_code).to_equal(302)


    # jclass GetThings(Vows,Context):
        # jdef 


# vim: et sw=4 sts=4
