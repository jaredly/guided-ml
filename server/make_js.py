#!/usr/bin/env python

from features import features
from learners import learners
import json
from os.path import join, dirname

feats = {}
for name in features:
    feats[name] = features[name].copy()
    del feats[name]['func']
dest = join(dirname(__file__), '..', 'client', 'features-raw.json')
open(dest, 'w').write(json.dumps(feats, 2))

learns = {}
for name in learners:
    learns[name] = learners[name].copy()
    del learns[name]['func']
dest = join(dirname(__file__), '..', 'client', 'learners-raw.json')
open(dest, 'w').write(json.dumps(learns, 2))


# vim: et sw=4 sts=4
