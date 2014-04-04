#!/usr/bin/env python

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

@feature({'dimension': 'dim'})
def average(data, dimension):
    '''Computes the average of a dimention'''
    return data[dimension].mean()

def make_feature(feature):
    if feature['type'] not in features:
        return None
    def meta(data):
        return features[feature['type']]['func'](data, **feature['args'])
    return meta

# vim: et sw=4 sts=4
