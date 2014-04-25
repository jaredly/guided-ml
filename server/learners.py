#!/usr/bin/env python

from Orange.classification.neural import NeuralNetworkLearner

learners = {}

def learner(args, title=None, name=None):
    def meta(func):
        _name = name
        _title = title
        if _name is None:
            _name = func.__name__
        if _title is None:
            _title = _name
        for arg in args:
            if 'title' not in args[arg]:
                args[arg]['title'] = arg
        learners[_name] = {
            'args': args,
            'doc': func.__doc__,
            'title': _title,
            'name': _name,
            'func': func
        }
        return func
    return meta

@learner({
    'n_mid': {
        'description': 'The size of the hidden layer',
        'title': 'Size of the Middle Layer',
        'default': 10,
        'type': 'int'
    },
    'max_iter': {
        'description': 'The max number of iterations',
        'title': 'Max Iterations',
        'default': 1000,
        'type': 'int'
    }
})
def neural(n_mid, max_iter):
    return NeuralNetworkLearner(n_mid=n_mid, max_iter=max_iter)

def make_learner(learner):
    if learner['type'] not in learners:
        return None
    return learners[learner['type']]['func'](**learner['args'])


# vim: et sw=4 sts=4
