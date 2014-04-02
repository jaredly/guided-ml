#!/usr/bin/env python

class DAO:
    def __init__(self, pl):
        self.pl = pl

    def new_project(self, name, zipfile):
        newid = self.pl.add_project(name)
        tuple(self.add_data(newid, zipfile))

    def update_name(self, id, name):
        return self.pl(id, name)

    def update_data(self, id, data):
        self.pl.drop_data(id)
        features = self.pl.get_features()
        training_data = []
        for inum, text in self.add_data(id, data):

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

    def add_data(self, id, data):
        with self.pl.write_batch() as wb:
            for inum, text, idata, vdata in self.parse_zip(data):
                self.pl.write_instance(id, inum, text, idata, vdata, wb)
                yield inum, text, idata is not None, vdata is not None

# vim: et sw=4 sts=4
