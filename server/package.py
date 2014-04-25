#!/usr/bin/env python

from cStringIO import StringIO
from zipfile import ZipFile
from os.path import join, dirname
from os import listdir
import cPickle
import json

BASE = dirname(__file__)

def learner(features, trained, learner):
    '''Create a zipfile with everything you need to start learning. 
    Returns a file-like'''

    sio = StringIO()
    zfile = ZipFile(sio, 'w')

    zfile.writestr('classify/classifier.pck', cPickle.dumps(trained))
    zfile.writestr('classify/features.py', open(join(BASE, 'features.py')).read())
    zfile.writestr('classify/features.json', json.dumps(features, indent=2))
    dname = join(BASE, 'template')
    for item in listdir(dname):
        if not item.endswith('.py'): continue
        zfile.writestr(join('classify', item), open(join(dname, item)).read())

    zfile.close()
    sio.seek(0)
    return sio

# vim: et sw=4 sts=4
