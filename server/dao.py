#!/usr/bin/env python

class LevelDB:
    def __init__(self, db):
        self.db = db

    def next_id(self):
        id = int(db.get(b'next_id', b'0'))
        db.put(b'next_id', id + 1)
        return id

    def new_project(self, name, zipfile):
        newid = self.next_id()

        self.update_name(newid, name)
        tuple(self.add_data(newid, zipfile))

    def list_projects(self):
        names = []
        for k, v in db.iterator(start=b'name:', stop=b'name:\xFF'):
            id = int(k.split(':')[1])
            names.append((id, v))
        return names

    def parse_zip(self, data):
        zipfile = ZipFile(data, 'r')
        all_files = zipfile.namelist()
        instances = [name for name in all_files if name.split('.')[-1] in ('csv', 'txt')]

        for inum, name in enumerate(instances):
            base = '.'.join(name.split('.')[:-1])
            img = base + '.png'
            vid = base + '.webm'
            idata = None
            vdata = None
            if img in all_files:
                idata = zipfile.open(img).read()
            if vid in all_files:
                vdata = zipfile.open(vid).read()
            text = zipfile.open(name).read()
            yield inum, text, idata, vdata

    def write_instance(self, id, inum, text, idata, vdata, wb):
        if idata:
            wb.put(b'file:{}:{}:img'.format(id, inum), idata)
        if vdata:
            wb.put(b'file:{}:{}:vid'.format(id, inum), vdata)
        wb.put(b'file:{}:{}'.format(id, inum), text)

    def add_data(self, id, data):
        with self.db.write_batch() as wb:
            for inum, text, idata, vdata in self.parse_zip(data):
                self.write_instance(id, inum, text, idata, vdata, wb)
                yield inum, text, idata is not None, vdata is not None

    def update_name(self, id, name):
        self.db.put(b'name:{}'.format(id), name)

    def drop_data(self, id):
        start = b'file:{}:'.format(id)
        end = b'file:{}:\xFF'.format(id)
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

    def update_data(self, id, data):
        self.drop_data(id)
        features = self.get_features()
        for inum, text, img, vid in self.add_data(id, data):

# vim: et sw=4 sts=4
