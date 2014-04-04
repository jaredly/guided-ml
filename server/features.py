#!/usr/bin/env python

import numpy as np

features = {}

def feature(args, name=None):
    def meta(func):
        _name = name
        if _name is None:
            _name = func.__name__
        features[_name] = {
            'args': args,
            'doc': func.__doc__,
            'func': func
        }
        return func
    return meta

def angle_between(data, dim1, dim2):
    dat1 = data[dim1]
    pa1 = dat1[:-2]
    pa2 = dat1[1:-1]
    pa3 = dat3[2:]

    dat2 = data[dim2]
    pb1 = dat2[:-2]
    pb2 = dat2[1:-1]
    pb3 = dat2[2:]

    angle1 = np.arctan2(pa2 - pa1, pb2 - pb1)
    angle2 = np.arctan2(pa3 - pa2, pb3 - pb2)
    return math.pi - (angle1 + angle2)

@feature({'dim1': 'dim', 'dim2': 'dim'})
def sum_angles(data, dim1, dim2):
    angles = angle_between(data, dim1, dim2)
    return angles.sum()

@feature({'dim1': 'dim', 'dim2': 'dim'})
def ssangles(data, dim1, dim2):
    angles = angle_between(data, dim1, dim2)
    return (angles**2).sum()

@feature({'dimension': 'dim'})
def average(data, dimension):
    '''Computes the average of a dimention'''
    return data[dimension].mean()

@feature({'code': '# use data\noutput = len(data)'})
def custom(data, code):
    compiled = compile(code, 'custom-feature', 'exec')
    scope = {'data': data, 'output': 0}
    exec(compiled, scope)
    return scope['output']

def make_feature(feature):
    if feature['type'] not in features:
        return None
    def meta(data):
        return features[feature['type']]['func'](data, **feature['args'])
    return meta

def list_features():
    return [(name, feat['args'], feat['doc']) for name, feat in features.items()]

# vim: et sw=4 sts=4
