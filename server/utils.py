#!/usr/bin/env python

import features
import csv

'''
def parse_csv(text):
    reader = csv.reader(text.split('\n'))
    header = reader.next()
    data = []
    for line in reader:
        it = []
        if not len(line):
            continue
        for item in line:
            try:
                item = float(item)
            except:
                pass
            it.append(item)
        data.append(it)
    return header, data
 '''
 
def parse_meta(text):
    return dict(line.strip().split('=') for line in text.split('\n'))

def train_learner(learner, data):
    '''takes a learner spec and training data
    returns a trained learner'''
    return None

def validate_learner(learner, data):
    '''takes a learner spec and training data
    returns a confusion matrix with the ids of the original data'''
    return None

def feature_function(feature):

    raise Exception('not implemented')

def make_training_data(instances, header, features):
    ffunctions = map(feature_function, features)
    training_data = []
    for inst in instances:
        training = [inst['id'], inst['class']]
        for feature in ffunctions:
            training.append(feature(inst['data']))
        training_data.append(training)
    return training_data

def make_training_column(instances, feature):
    ffunction = feature_function(feature)
    return [ffunction(inst['data']) for inst in instances]


# vim: et sw=4 sts=4
