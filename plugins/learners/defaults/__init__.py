#!/usr/bin/env python

from Orange.classification.neural import NeuralNetworkLearner
from Orange.classification.knn import kNNLearner
from Orange.classification.svm import SVMLearner
from Orange.classification.tree import C45Learner
from Orange.classification.bayes import NaiveLearner
from Orange.classification.logreg import LogRegLearner

def register(learner):
    learner(NaiveLearner)
    learner(kNNLearner)
    learner(SVMLearner)
    learner(NeuralNetworkLearner)

    '''
    @learner()
    def naive_bayes():
        return NaiveLearner()

    @learner()
    def knn():
        return kNNLearner()

    @learner()
    def svm():
        return SVMLearner()

    @learner()
    def neural(n_mid, max_iter):
        return NeuralNetworkLearner(n_mid=n_mid, max_iter=max_iter)
    '''


# vim: et sw=4 sts=4
