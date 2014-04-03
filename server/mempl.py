#!/usr/bin/env python

from pl import PL

class MemPL(PL):
    def __init__(self):
        self.nextid = 0
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
        return id

    def drop_data(self, id):
        del self.files[id]

    def get_features(self, id):
        return self.features[id]

    def write_instances(self, id, instances, metas):
        self.instances[id] = instances
        self.metas[id] = metas





# vim: et sw=4 sts=4
