#!/usr/bin/env python

from Orange.classification.neural import NeuralNetworkLearner
from Orange.classification.knn import kNNLearner
from Orange.classification.svm import SVMLearner
from Orange.classification.tree import C45Learner
from Orange.classification.bayes import NaiveLearner
from Orange.classification.logreg import LogRegLearner

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
    # adjust_threshhold - bool .. not yet supported
})
def naive_bayes():
    return NaiveLearner()

@learner({
})
def knn():
    return kNNLearner()

@learner({
    # normalization
})
def svm():
    return SVMLearner()

'''
@learner({
    # trials
})
def dtree():
    return C45Learner()

@learner({
})
def logreg():
    return LogRegLearner()
'''


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
