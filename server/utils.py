#!/usr/bin/env python

from orngStat import computeConfusionMatrices, CA
from orngTest import crossValidation
from pandas import DataFrame
import numpy as np
import Orange

from features import make_feature, list_features
from learners import make_learner
import csv

def parse_meta(text):
    return dict(line.strip().split('=') for line in text.decode('ascii').split('\n'))

def train_learner(learner, data):
    '''takes a learner spec and training data
    returns a trained learner'''
    lcls = make_learner(learner)
    raise Exception('not implemented')
    return None

def validate_learners(learners, data, folds=10):
    data = DataFrame(data)
    if not learners:
        return {}, {}
    lclss = [make_learner(learner) for learner in learners]
    table = pandas_to_orange(data)
    results = crossValidation(lclss, table, folds=folds)
    acc = CA(results)
    confusion = computeConfusionMatrices(results)
    acc_d = {}
    conf_d = {}
    assignments = {}
    for i in range(len(learners)):
        acc_d[learners[i]['id']] = acc[i]
        conf_d[learners[i]['id']] = list(confusion[i])
        assignments[learners[i]['id']] = [res.classes[i] for res in results.results]
    return acc_d, conf_d, results.class_values, assignments

def validate_learner(learner, data, folds=10):
    '''takes a learner spec and training data
    returns a confusion matrix with the ids of the original data'''
    data = DataFrame(data)
    lcls = make_learner(learner)
    table = pandas_to_orange(data)
    results = crossValidation([lcls], table, folds=folds)
    acc = CA(results)[0]
    confusion = computeConfusionMatrices(results)
    assignments = [res.classes[0] for res in results.results]
    return acc, confusion[0], results.class_values, assignments

def make_training_data(instances, header, features):
    ffunctions = map(make_feature, features)
    training_data = []
    for inst in instances:
        training = [inst['id'], inst['class']]
        for feature in ffunctions:
            training.append(feature(inst['data']))
        training_data.append(training)
    return training_data

def make_training_column(instances, feature):
    ffunction = make_feature(feature)
    return [applyOrZero(ffunction, inst['data'], inst['id']) for inst in instances]

def applyOrZero(fn, arg, id):
    try:
        val = fn(arg)
        print 'Value', id, val
        return val
    except Exception as e:
        print 'Failed!! while evaluating a feature'
        print e
        return 0

def list_learners():
    return []

def orange_feature(name, col):
    t = col.dtype.name
    if t == 'object':
        return Orange.feature.Discrete(str(name), values=list(col.unique()))
    if t in ('float64', 'int64', 'float32', 'int32'):
        return Orange.feature.Continuous(name)
    raise Exception('Invalid data type: ' + t)

def pandas_to_orange(dframe):
    features = [orange_feature(name, dframe[name]) for name in dframe.columns[2:]]
    vclass = dframe.columns[1]
    features.append(orange_feature(vclass, dframe[vclass]))
    domain = Orange.data.Domain(features)
    ncols = list(dframe.columns)
    ncols.pop(0)
    ncols.append(ncols.pop(0))
    noid = dframe[ncols]
    print noid
    table = Orange.data.Table(domain, np.array(noid).tolist())
    return table


# vim: et sw=4 sts=4
