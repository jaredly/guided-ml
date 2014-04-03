#!/usr/bin/env python

from pl import PL

class MemPL(PL):
    def __init__(self):
        self.nextid = 0
        self.nextfid = {}
        self.nextlid = {}
        self.names = {}
        self.features = {}
        self.files = {}
        self.instances = {}
        self.metas = {}

    def update_name(self, id, name):
        self.names[id] = name

    def add_project(self, name):
        id = self.nextid
        self.nextid += 1
        self.update_name(id, name)
        self.features[id] = {}
        self.files[id] = {}
        self.nextfid[id] = 0
        self.nextlid[id] = 0
        return id

    def drop_data(self, id):
        del self.files[id]

    def get_features(self, id):
        features = sorted(self.features[id].items())
        return [f for _, f in features]

    def write_instances(self, id, instances, metas):
        self.instances[id] = instances
        self.metas[id] = metas

    def get_raw_data(self, id):
        return self.instances[id]

    def add_feature(self, id, name, type, args):
        fid = self.nextfid[id]
        self.nextfid[id] += 1
        self.features[id][fid] = {
            'name': name,
            'type': type,
            'args': args
        }
        return fid

    def remove_feature(self, id, fid):
        del self.features[id][fid]

    def update_feature_name(self, id, fid, name):
        self.features[id][fid]['name'] = name

    def update_feature_args(self, id, fid, args):
        self.features[id][fid]['args'] = args




# vim: et sw=4 sts=4
