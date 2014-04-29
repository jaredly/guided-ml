#!/usr/bin/env python

import plugme
from os.path import dirname, join
BASE = join(dirname(__file__), 'plugins/learners')

def load():
    return plugme.load(BASE)

def make_learner(learners, learner):
    if learner['type'] not in learners:
        return None
    return learners[learner['type']]['func'](**learner['args'])

# vim: et sw=4 sts=4
