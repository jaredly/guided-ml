#!/usr/bin/env python

import plugme
from os.path import dirname, join
BASE = join(dirname(__file__), 'plugins/features')

def load():
    return plugme.load(BASE)

def make_feature(features, feature):
    if feature['type'] not in features:
        return None
    def meta(data):
        return features[feature['type']]['func'](data, **feature['args'])
    return meta

# vim: et sw=4 sts=4
