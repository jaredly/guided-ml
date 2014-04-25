
var LearnersPage = require('../pages/learners.jsx')

React.renderComponent(LearnersPage({
  pid: 0,
  dao: {
    getLearnerData: function () {
      return new Promise(function (res, rej) {
        setTimeout(function () {
        res({
          classes: ['A', 'B', 'C'],
          learners: [{
            id: 1,
            name: 'The Best Learner',
            type: 'neural',
            args: {
              max_iter: 1000,
              n_mid: 10
            }
          }],
          confusion: {
            1: [[2,3,4],[3,4,5],[4,5,6]],
          },
          accuracy: {
            1: 0.798
          },
          assignments: {
            0: 0,
            1: 1,
            2: 2,
            3: 1,
            4: 1,
            5: 0
          }
        })
        }, 0)
      })
    }
  },
}), document.getElementById('main'))

