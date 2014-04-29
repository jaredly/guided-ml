
module.exports = function (register) {
  register('neural', 'Backprop Neural Net', {
    n_mid: {
      description: 'The size of the hidden layer',
      title: 'Size of the Middle Layer',
      default: 10,
      type: 'int'
    },
    max_iter: {
      description: 'The max number of iterations',
      title: 'Max Iterations',
      default: 1000,
      type: 'int'
    }
  })

  register('naive_bayes', 'Naive Bayes')
  // adjust_threshhold -- not yet support

  register('knn', 'k Nearest Meighbor')
  register('svm', 'Support Vector Machines')
}

