#!/usr/bin/env python

from pl import PL

class MemPL(PL):
    def __init__(self):
        self.nextid = 0
        self.nextfid = {}
        self.nextlid = {}
        self.names = {}
        self.features = {}
        self.learners = {}
        self.files = {}
        self.instances = {}
        self.metas = {}
        self.headers = {}
        self.classes = {}

    def list_projects(self):
        return list({'id': id, 'name': name} for (id, name) in self.names.items())

    def update_name(self, id, name):
        self.names[id] = name

    def get_name(self, id):
        return self.names[id]

    def add_project(self, name):
        id = self.nextid
        self.nextid += 1
        self.update_name(id, name)
        self.features[id] = {}
        self.learners[id] = {}
        self.headers[id] = []
        self.files[id] = {}
        self.nextfid[id] = 0
        self.nextlid[id] = 0
        self.classes[id] = []
        return id

    def drop_data(self, id):
        del self.files[id]

    def get_features(self, id):
        return self.features[id].copy()
    
    def get_learners(self, id):
        return self.learners[id].copy()

    def write_instances(self, id, instances, metas, headers, classes):
        self.instances[id] = instances
        self.metas[id] = metas
        self.headers[id] = headers
        self.classes[id] = classes

    def get_classes(self, id):
        return self.classes[id]

    def get_headers(self, id):
        return self.headers[id]

    def get_raw_data(self, id):
        return self.instances[id]

    def get_img(self, id, instid):
        if instid not in self.metas[id]:
            return None
        return self.metas[id][instid]['img']

    def get_vid(self, id, instid):
        if instid not in self.metas[id]:
            return None
        return self.metas[id][instid]['vid']

    def add_feature(self, id, feature):
        fid = self.nextfid[id]
        self.nextfid[id] += 1
        self.features[id][fid] = feature
        return fid

    def get_feature(self, id, fid):
        return self.features[id][fid]

    def get_learner(self, id, lid):
        return self.learners[id][lid]

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

    def remove_learner(self, id, lid):
        del self.learners[id][lid]

    def update_feature_name(self, id, fid, name):
        self.features[id][fid]['name'] = name

    def update_feature_args(self, id, fid, args):
        self.features[id][fid]['args'] = args

    def update_feature(self, id, fid, data):
        print 'prev feature', self.features[id][fid]
        for key in data:
            self.features[id][fid][key] = data[key]
        print 'updated feature', self.features[id][fid]
        return self.features[id][fid]



# vim: et sw=4 sts=4
