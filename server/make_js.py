#!/usr/bin/env python

from features import features
import json
from os.path import join, dirname

feats = {}
for name in features:
    feats[name] = features[name].copy()
    del feats[name]['func']
dest = join(dirname(__file__), '..', 'client', 'features-raw.json')
open(dest, 'w').write(json.dumps(feats, 2))


# vim: et sw=4 sts=4
