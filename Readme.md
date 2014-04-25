
# Server

- projects
- features
- learners
- run learners
- get code

```
POST /projects/
- name
- file
=> full data

POST /projects/{id}
- name (or)
- file
=> Ok

POST /projects/{id}/features/
- name
- type
- args
=> new data column

POST /projects/{id}/features/{id}
- name/args
=> changed data column? otherwise 203

DEL /projects/{id}/features/{id}
=> 203

POST /projects/{id}/learners/
- name
- type
- args
=> 203

POST /projects/{id}/learners/{id}
- name or args
=> 203

POST /projects/{id}/train/{id}
=> accuracy, confusion matrix

GET /projects/{id}/compiled/{lang}/{id}
```


# Data Model

```
project: {
  name: '',
  version: 0,
  classes: [],
  headers: [],
  sources: [{
    id: id,
    type: 'segmented',
    filename: '',
    name: '',
  } | {
    id: id,
    type: 'unsegmented',
    filename: '',
    name: '',
    segmenter: {???}
  },
  features: [{
    id: id,
    type: '',
    name: '',
    args: {}
  }],
  processors: [{
    id: id,
    name: '',
    type: '',
    args: ''
  }],
  learners: [{
    id: id,
    name: '',
    type: '',
    args: {}
  }]
},
results: [{
  type: 'single',
  project: {},
  result: {
    accuracies: {},
    confusion: {},
    assignments: {},
    extra: {} // <- defined && used on a plugin level
  }
} | {
  type: 'parameterization', // easily parrallelizable
  object: {
    type: 'processor',
    which: 2,
    param: 'n_big'
  },
  range: {
    from: 1,
    to: 6,
    step: 1
  } | [1,2,3,4,5,6], // <-- for ordinal values too.
  project: {},
  results: {
    // value is one from the range given
    value: {
      accuracies: {},
      confusion: {},
      assignments: {},
      extra: {} // <- defined && used on a plugin level
    }
  }
} | {
  type: 'search', // this can't be parrallelized as well generally.
  project: {},
  object: {
    type: 'feature',
    which: 2,,
    param: 'n_big'
  },
  search_type: ??? what types of searches are there? And could there be a
               interactive search? That's one thing that could be super interesting.
  results: {}
}],
runtime: {
  raw_data: [
    {filename:, meta:, data:, vclass:},
  ],
  data: [[]],
}
```



