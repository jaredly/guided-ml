#!/usr/bin/env python

from zipfile import ZipFile
from pandas import DataFrame, read_table
import utils

def depandas(instances):
    ready = []
    for inst in instances:
        read = inst.copy()
        dframe = read['data'].astype('object')
        read['data'] = [list(dframe.iloc[i]) for i in range(len(dframe))]
        ready.append(read)
    return ready

class DAO:
    def __init__(self, pl):
        self.pl = pl

    def list_projects(self):
        return self.pl.list_projects()

    def new_project(self, name, zipfile):
        newid = self.pl.add_project(name)
        self.add_data(newid, zipfile)
        return newid

    def get_project(self, id):
        return {
            'features': self.pl.get_features(id),
            'raw_data': depandas(self.pl.get_raw_data(id)),
            'learners': self.pl.get_learners(id),
            'name': self.pl.get_name(id),
            'headers': self.pl.get_headers(id)
        }

    def update_name(self, id, name):
        return self.pl.update_name(id, name)

    def update_data(self, id, data):
        self.pl.drop_data(id)
        raw_data, header = self.add_data(id, data)
        features = self.pl.get_features()
        return utils.make_training_data(raw_data, header, features)

    def parse_zip(self, rawzip):
        zipfile = ZipFile(rawzip, 'r')
        all_files = zipfile.namelist()
        instances = [name for name in all_files if name.split('.')[-1] == 'csv']

        for inum, name in enumerate(instances):
            base = '.'.join(name.split('.')[:-1])
            img = base + '.png'
            vid = base + '.webm'
            meta = base + '.meta'
            idata = None
            vdata = None
            mdata = None
            if img in all_files:
                idata = zipfile.open(img).read()
            if vid in all_files:
                vdata = zipfile.open(vid).read()
            if meta in all_files:
                mdata = utils.parse_meta(zipfile.open(meta).read())
            dframe = read_table(zipfile.open(name), sep=',')
            iclass = name.split('-')[0]
            yield inum, name, iclass, dframe, mdata, idata, vdata

    def add_data(self, id, rawzip):
        instances = []
        global_header = None
        classes = set()
        metas = {}
        for inum, filename, iclass, dframe, mdata, idata, vdata in self.parse_zip(rawzip):
            metas[inum] = {
                'img': idata,
                'vid': vdata
            }

            classes.add(iclass)
            header = list(dframe.columns)
            if global_header is None:
                global_header = header
            if header != global_header:
                raise Exception('Parse failure: all instances must have\
                        the same column headers. {}: {}'.format(inum, filename))
            instances.append({
                "id": inum,
                "data": dframe,
                "filename": filename,
                "class": iclass,
                "meta": mdata,
                "has_img": idata is not None,
                "has_vid": vdata is not None
            })
            # yield inum, text, idata is not None, vdata is not None
        self.pl.write_instances(id, instances, metas, global_header, classes)
        return instances, global_header

    # features

    def add_feature(self, id, name, type, args):
        raw_data = self.pl.get_raw_data(id)
        feature = {'name': name, 'type': type, 'args': args}
        fid = self.pl.add_feature(id, feature)
        return fid, utils.make_training_column(raw_data, feature), feature

    def remove_feature(self, id, fid):
        self.pl.remove_feature(id, fid)

    def update_feature_name(self, id, fid, name):
        self.pl.update_feature_name(id, fid, name)

    def update_feature_args(self, id, fid, args):
        self.pl.update_feature_args(id, fid, args)

    # learners

    def get_compiled(self, id, lid, target):
        features, trained, learner = self.trained_learner(id, lid)
        return utils.compile_learner(target, features, trained, learner)

    def has_target(self, target):
        return target == 'orange'

    def get_vid(self, id, instid):
        self.pl.get_vid(id, instid)

    def get_img(self, id, instid):
        self.pl.get_img(id, instid)

    def update_learner(self, id, lid, name, args):
        self.pl.update_learner(id, lid, name, args)

    def add_learner(self, id, name, type, args):
        learner = {
            'name': name,
            'type': type,
            'args': args
        }
        return self.pl.add_learner(id, learner)

    def trained_learner(self, id, lid):
        features = self.pl.get_features(id)
        learner  = self.pl.get_learner(id, lid)
        raw_data = self.pl.get_raw_data(id)
        data     = utils.make_training_data(raw_data, features)

        trained = utils.train_learner(learner, data)
        return features, trained, learner

    def make_data(self, id):
        features = self.pl.get_features(id)
        raw_data = self.pl.get_raw_data(id)
        data     = utils.make_training_data(raw_data, features)
        return data

    def train(self, id, lid):
        learner  = self.pl.get_learner(id, lid)
        data = self.make_data(id)

        return utils.validate_learner(learner, data)

    def train_all(self, id):
        learners = self.pl.get_learners(id)
        data = self.make_data(id)
        confused = {}

        for k, learner in learners.items():
            confused[k] = utils.validate_learner(learner, data)

        return confused

# vim: et sw=4 sts=4
