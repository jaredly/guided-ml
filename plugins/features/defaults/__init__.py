#!/usr/bin/env python

import numpy as np
import math

def angle_list(col1, col2):
    x1 = col1[:-1]
    x2 = col1[1:].reset_index(drop=True)
    y1 = col2[:-1]
    y2 = col2[1:].reset_index(drop=True)

    return np.arctan2(x2 - x1, y2 - y1)

def angle_delta(data, dim1, dim2):
    angles = angle_list(data[dim1], data[dim2])
    return angles[1:].reset_index(drop=True) - angles[:-1]

def angle_between(data, dim1, dim2):
    angles = angle_list(data[dim1], data[dim2])
    return np.pi + angles[1:].reset_index(drop=True) - angles[:-1]

def register(feature):

    def dim1_args(dim, stats):
      names = []
      if data['stats']['min']: names.append('Min')
      if data['stats']['max']: names.append('Max')
      if data['stats']['mean']: names.append('Mean')
      if data['stats']['first']: names.append('First')
      if data['stats']['last']: names.append('Last')
      if data['stats']['variance']: names.append('Variance')
      if data['stats']['std_dev']: names.append('Std Deviation')
      return names

    @feature(argnames=dim1_args)
    def dim1(data, dim, stats):
        col = data[dim]
        if not len(data):
            return None
        nums = []
        if stats['min']: nums.append(col.min())
        if stats['max']: nums.append(col.max())
        if stats['mean']: nums.append(col.mean())
        if stats['first']: nums.append(col[0])
        if stats['last']: nums.append(col[-1])
        if stats['variance']:
            var = (col - col.mean()).mean()
            nums.append(var)

            if stats['std_dev']:
                nums.append(var**.5)
        elif stats['std_dev']:
            nums.append((col - col.mean()).mean()**.5)
        return nums

    def dim2_args(dim1, dim2, stats):
      names = []
      if data['stats']['sum_deltas']: names.append('Sum Deltas')
      if data['stats']['sumsq_deltas']: names.append('Deltas^2')
      if data['stats']['sum4_deltas']: names.append('Deltas^4')
      if data['stats']['mean_deltas']: names.append('Mean Deltas')
      if data['stats']['mean2_deltas']: names.append('Mean^2 Deltas')

      if data['stats']['sum']: names.append('Sum')
      if data['stats']['sumsq']: names.append('Sum^2')
      if data['stats']['sum4']: names.append('Sum^4')
      if data['stats']['mean']: names.append('Mean')
      if data['stats']['mean2']: names.append('Mean^2')
      return names

    @feature(argnames=dim2_args)
    def dim2_cartesion(data, dim1, dim2, stats):

        angles = angle_list(data[dim1], data[dim2])
        deltas = angles[1:].reset_index(drop=True) - angles[:-1]
        inner = deltas + np.pi

        if stats['sum_deltas']: nums.append(deltas.sum())
        if stats['sumsq_deltas']: nums.append((deltas ** 2).sum())
        if stats['sum4_deltas']: nums.append((deltas ** 4).sum())
        if stats['mean_deltas']: nums.append(deltas.mean())
        if stats['mean2_deltas']: nums.append((deltas ** 2).mean())

        if stats['sum']: nums.append(angles.sum())
        if stats['sumsq']: nums.append((angles ** 2).sum())
        if stats['sum4']: nums.append((angles ** 4).sum())
        if stats['mean']: nums.append(angles.mean())
        if stats['mean2']: nums.append((angles ** 2).mean())

        return nums

    @feature({'code': {
        'type': 'str-multi',
        'description': 'Put your python code here, and set the resulting value to `output`.\
                        `data` is a pandas.DataFrame containing the raw data for a single instance.',
        'default': '# use data\noutput = len(data)'
        }})
    def custom(data, code):
        compiled = compile(code, 'custom-feature', 'exec')
        scope = {'data': data, 'output': 0, 'np': np, 'angle_between': angle_between, 'angle_2_between': angle_2_between}
        exec(compiled, scope)
        return scope['output']


# vim: et sw=4 sts=4
