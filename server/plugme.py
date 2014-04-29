#!/usr/bin/env python

import os
from os.path import dirname, join
from functools import partial
import imp

def register(table, name=None, **kwds):
    def meta(func):
        _name = name
        if _name is None:
            _name = func.__name__
        kwds['func'] = func
        table[_name] = kwds
        return func
    if isinstance(name, str):
        return meta
    func = name
    name = func.__name__
    return meta(name)

def load(basedir, reg=register):
    table = {}
    dirs = os.listdir(dirs)
    learners = {}
    register = partial(reg, table)
    for dname in dirs:
        dpath = join(basedir, dname)
        if not os.path.isdir(dpath): continue
        mod = imp.load_module('plugin-' + dname, dpath)
        mod.learners(register)
    return learners


# vim: et sw=4 sts=4
