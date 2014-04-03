#!/usr/bin/env python

def parse_text(text):
    pass

def feature_function(feature):
    pass

def make_training_data(instances, features):
    ffunctions = map(feature_function, features)
    training_data = []
    for inst in instances:
        training = [inst['id'], inst['class']]
        for feature in ffunctions:
            training.append(feature(inst['data']))
        training_data.append(training)
    return training_data

class DAO:
    def __init__(self, pl):
        self.pl = pl

    def new_project(self, name, zipfile):
        newid = self.pl.add_project(name)
        self.add_data(newid, zipfile)
        return newid

    def update_name(self, id, name):
        return self.pl(id, name)

    def update_data(self, id, data):
        self.pl.drop_data(id)
        raw_data = self.add_data(id, data)
        features = self.pl.get_features()
        return make_training_data(raw_data, features)

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
            iclass = name.split('-')[0]
            yield inum, name, iclass, text, idata, vdata

    def add_data(self, id, data):
        instances = []
        keys = [] 
        classes = set()
            metas = {}
            for inum, filename, iclass, text, idata, vdata in self.parse_zip(data):
                metas[id] = inum, idata, vdata

                classes.add(iclass)
                data, keys = parse_text(text)
                if gkeys is not None and keys != gkeys:
                    raise Exception('Parse failure: all instances must have\
                            the same column headers. {}: {}'.format(inum, filename))
                instances.append({
                    "id": inum,
                    "data": parse_text(text),
                    "filename": filename,
                    "class": iclass,
                    "has_img": idata is not None,
                    "has_vid": vdata is not None
                })
                # yield inum, text, idata is not None, vdata is not None
            self.pl.write_instances(id, instances, metas)
        return instances


# vim: et sw=4 sts=4
