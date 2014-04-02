
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




