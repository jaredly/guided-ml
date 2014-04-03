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

    def list_projects(self):
        return self.names.items()

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
        # features = sorted(self.features[id].items())
        return self.features[id].copy()
    
    def get_learners(self, id):
        return self.learners[id].copy()

    def write_instances(self, id, instances, metas):
        self.instances[id] = instances
        self.metas[id] = metas

    def get_raw_data(self, id):
        return self.instances[id]

    def get_img(self, id, instid):
        try:
            return self.metas[id][instid]['img']
        except IndexError:
            return None

    def get_vid(self, id, instid):
        try:
            return self.metas[id][instid]['vid']
        except IndexError:
            return None

    def add_feature(self, id, feature):
        fid = self.nextfid[id]
        self.nextfid[id] += 1
        self.features[id][fid] = feature
        return fid

    def add_learner(self, id, learner):
        lid = self.nextlid[id]
        self.nextlid[id] += 1
        self.learners[id][lid] = learner
        return lid

    def update_learner(self, id, lid, name, args):
        if name is not None:
            self.learners[id][lid]['name'] = name
        if args is not None:
            self.learners[id][lid]['args'] = args

    def remove_feature(self, id, fid):
        del self.features[id][fid]

    def update_feature_name(self, id, fid, name):
        self.features[id][fid]['name'] = name

    def update_feature_args(self, id, fid, args):
        self.features[id][fid]['args'] = args




# vim: et sw=4 sts=4
