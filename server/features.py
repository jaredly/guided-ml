#!/usr/bin/env python

import numpy as np
import math

features = {}

def feature(args, title=None, name=None):
    def meta(func):
        _name = name
        _title = title
        if _name is None:
            _name = func.__name__
        if _title is None:
            _title = _name
        features[_name] = {
            'args': args,
            'title': _title,
            'doc': func.__doc__,
            'func': func
        }
        return func
    return meta

def angle_between(data, dim1, dim2):
    dat1 = data[dim1]
    pa1 = dat1[:-2]
    pa2 = dat1[1:-1]
    pa3 = dat1[2:]

    dat2 = data[dim2]
    pb1 = dat2[:-2]
    pb2 = dat2[1:-1]
    pb3 = dat2[2:]

    angle1 = np.arctan2(pa2 - pa1, pb2 - pb1)
    angle2 = np.arctan2(pa3 - pa2, pb3 - pb2)
    return math.pi - (angle1 + angle2)

@feature({'dim': 'dim'})
def variance(data, dim):
    if not len(data): return 0
    col = data[dim]
    return ((col - col.mean())**2).mean()

@feature({'dim1': 'dim', 'dim2': 'dim'})
def covariance(data, dim1, dim2):
    if not len(data): return 0
    col1 = data[dim1]
    col2 = data[dim2]
    return ((col1 - col1.mean())*(col2 - col2.mean())).mean()

@feature({'dim': 'dim'})
def std_dev(data, dim):
    if not len(data): return 0
    col = data[dim]
    return ((col - col.mean())**2).mean()**.5

@feature({'dim': 'dim'})
def max(data, dim):
    if not len(data): return 0
    return data[dim].max()

@feature({'dim': 'dim'})
def min(data, dim):
    if not len(data): return 0
    return data[dim].min()

@feature({'dim1': 'dim', 'dim2': 'dim'})
def sum_angles(data, dim1, dim2):
    if not len(data): return 0
    angles = angle_between(data, dim1, dim2)
    return angles.sum()

@feature({'dim1': 'dim', 'dim2': 'dim'})
def ssangles(data, dim1, dim2):
    angles = angle_between(data, dim1, dim2)
    return (angles**2).sum()

@feature({'dimension': 'dim'})
def average(data, dimension):
    '''Computes the average of a dimention'''
    if not len(data[dimension]): return 0
    return data[dimension].mean()

@feature({'code': {
    'type': 'str-multi',
    'description': 'Put your python code here, and set the resulting value to `output`.\
                    `data` is a pandas.DataFrame containing the raw data for a single instance.',
    'default': '# use data\noutput = len(data)'
    }})
def custom(data, code):
    compiled = compile(code, 'custom-feature', 'exec')
    scope = {'data': data, 'output': 0}
    exec(compiled, scope)
    return scope['output']

def make_feature(feature):
    if feature['type'] not in features:
        return None
    print 'making feature', feature['type'], feature['args']
    def meta(data):
        return features[feature['type']]['func'](data, **feature['args'])
    return meta

def list_features():
    return [(name, feat['args'], feat['doc']) for name, feat in features.items()]

# vim: et sw=4 sts=4
