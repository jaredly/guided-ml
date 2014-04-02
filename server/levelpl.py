#!/usr/bin/env python

import plyvel

class LevelPL:
    def __init__(self, dbpath=None):
        if dbpath is None:
            dbpath = join(dirname(__file__), 'db')
        self.db = plyvel.DB(dbpath, create_if_missing=True)

    def next_id(self):
        id = int(db.get(b'next_id', b'0'))
        db.put(b'next_id', id + 1)
        return id

    def update_name(self, id, name):
        self.db.put(b'name:{}'.format(id), name)

    def drop_data(self, id):
        start = b'file:{}:'.format(id)
        end =   b'file:{}:\xFF'.format(id)
        for k in self.db.iterator(start=start, stop=end, include_value=False):
            self.db.delete(k)

    def get_features(self, id):
        features = []
        start = b'feature:{}:'.format(id)
        end =   b'feature:{}:\xFF'.format(id)
        for k, v in self.db.iterator(start=start, stop=end):
            fid = int(k.split(':')[-1])
            features.append((fid, json.loads(v)))
        return features

    def list_projects(self):
        names = []
        for k, v in db.iterator(start=b'name:', stop=b'name:\xFF'):
            id = int(k.split(':')[1])
            names.append((id, v))
        return names

    def write_instance(self, id, inum, text, idata, vdata, wb):
        if idata:
            wb.put(b'file:{}:{}:img'.format(id, inum), idata)
        if vdata:
            wb.put(b'file:{}:{}:vid'.format(id, inum), vdata)
        wb.put(b'file:{}:{}'.format(id, inum), text)

    def write_batch(self):
        return self.db.write_batch()

    def add_project(self, name):
        newid = self.next_id()
        self.update_name(newid, name)
        return newid



# vim: et sw=4 sts=4
