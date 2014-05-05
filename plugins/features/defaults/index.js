
var Editor = require('./edit.jsx')

module.exports = function (register) {
  // 1 dimension
  register({
    name: 'dim1',
    title: '1 Dim Statistics', 
    description: 'Calculate a number of statistics about one dimension of data',
    args: {
      stats: {
        min: {
          title: 'Minimum',
          description: 'min(x)',
          type: 'bool'
        },
        max: {
          title: 'Maximum',
          description: 'max(x)',
          type: 'bool'
        },
        mean: {
          title: 'Mean',
          description: 'The average',
          type: 'bool'
        },
        first: {
          title: 'First',
          description: 'The first data value',
          type: 'bool'
        },
        last: {
          title: 'Last',
          description: 'The last data value',
          type: 'bool'
        },
        variance: {
          title: 'Variance',
          description: 'avg(x - avg(x))',
          type: 'bool'
        },
        std_dev: {
          title: 'Standard Deviation',
          description: 'sqrt(variance)',
          type: 'bool'
        }
      }
    },
    /*
    argnames: function (data) {
      var names = []
      if (data.stats.min) names.push('Min')
      if (data.stats.max) names.push('Max')
      if (data.stats.mean) names.push('Mean')
      if (data.stats.first) names.push('First')
      if (data.stats.last) names.push('Last')
      if (data.stats.variance) names.push('Variance')
      if (data.stats.std_dev) names.push('Std Deviation')
      return names
    },
    */
    widget: Editor
  })
  // 2 dimension
  /*
  register({
    name: 'dim1',
    title: '1 Dim Statistics', 
    description: 'Calculate a number of statistics about one dimension of data',
    args: {
      dim1: {
        title: 'Dimension 1',
        description: 'The first dimention to use in caculcation',
        type: 'dim'
      },
      dim2: {
        title: 'Dimension 2',
        description: 'The second dimention to use in caculcation',
        type: 'dim'
      },
      stats: {
        min: {
          title: 'Minimum',
          description: 'min(x)',
          type: 'bool'
        },
        max: {
          title: 'Maximum',
          description: 'max(x)',
          type: 'bool'
        },
        mean: {
          title: 'Mean',
          description: 'The average',
          type: 'bool'
        },
        first: {
          title: 'First',
          description: 'The first data value',
          type: 'bool'
        },
        last: {
          title: 'Last',
          description: 'The last data value',
          type: 'bool'
        },
        variance: {
          title: 'Variance',
          description: 'avg(x - avg(x))',
          type: 'bool'
        },
        std_dev: {
          title: 'Standard Deviation',
          description: 'sqrt(variance)',
          type: 'bool'
        }
      }
    },
  })*/

  register({
    name: 'custom',
    title: 'Custom Python',
    description: 'Evaluate custom python code',
    args: {
      code: {
        type: 'str-multi',
        description: 'Put your python code here, and set the resulting value to `output`. `data` is a pandas.DataFrame object',
        title: 'Python Code'
      }
    },
  })
}

