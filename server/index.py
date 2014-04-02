#!/usr/bin/env python
from flask import Flask, request, session
import leveldb
import json
import os
app = Flask(__name__)
db = leveldb.LevelDB(os.path.join(os.path.dirname(__file__), 'db'))

@app.route('/projects/new', methods=['POST'])
def new_project():
    data = request.files['file']
    name = request.form['name']
    maxid = 0
    for k, v in db.RangeIter('name:', 'name:\xFF'):
        at = int(k.split(':')[1])
        if at > maxid:
            maxid = at
    newid = maxid + 1

    db.Put('name:{}'.format(newid), name)
    db.Put('file:{}'.format(newid), data.read())

@app.route('/projects/', methods=['GET'])
def list_projects():
    names = []
    for k, v in db.RangeIter('name:', 'name:\xFF'):
        id = int(k.split(':')[1])
        names.append((id, v))
    return json.dumps(names)

@app.route('/parojets/<int:id>', methods=['POST'])



# vim: et sw=4 sts=4
