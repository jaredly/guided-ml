#!/usr/bin/env python

from os import join, dirname
from squig import featurify
from cStringIO import StringIO
import cPickle
import json
import sys

import features

def get_lines():
    lines = []
    while True:
        line = sys.stdin.readline().strip()
        if not line:
            break
        lines.append(line)
    return lines

BASE = dirname(__file__)
CLSS = join(BASE, 'classifier.pck')

def get_input():
    return sys.stdin.read()

def get_class(classifier, features, text):
    sio = StringIO(text)
    data = pandas.read_csv(sio)
    line = [feature(data) for feature in features]

    return classifier(line)

def load_features(items):
    '''Takes a list of json specifications, returns a list of functions '''
    return [features.make_feature(item) for item in items]

## TODO just test this thing. Looks decent.

if __name__ == '__main__':
    classifier = cPickle.load(open(CLSS, 'rb'))
    features = load_features(join.load(open(join(BASE, 'features.json'))))

    text = get_input()
    print get_class(classifier, features, text)

'''
for i in range(10):
    lines = get_lines()
    if not lines:
        break
    print classifier(featurify(lines)).value.strip('"')
    sys.stdout.flush()
'''

# vim: et sw=4 sts=4
