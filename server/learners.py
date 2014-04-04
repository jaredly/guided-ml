#!/usr/bin/env python

from Orange.classification.neural import NeuralNetworkLearner

learners = {}

def learner(args, name=None):
    def meta(func):
        _name = name
        if _name is None:
            _name = func.__name__
        learners[_name] = {
            'args': args,
            'doc': func.__doc__,
            'func': func
        }
        return func
    return meta

@learner({
    'n_mid': {
        'description': 'The size of the hidden layer',
        'default': 10,
        'type': int
    },
    'max_iter': {
        'description': 'The max number of iterations',
        'default': 1000,
        'type': int
    }
})
def neural(n_mid, max_iter):
    return NeuralNetworkLearner(n_mid=n_mid, max_iter=max_iter)

def make_learner(learner):
    if learner['type'] not in learners:
        return None
    return learners[learner['type']]['func'](**feature['args'])


# vim: et sw=4 sts=4
