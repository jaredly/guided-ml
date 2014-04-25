
js_deps = $(wildcard ../pages/*.js) $(wildcard ../*.js) $(wildcard ../pages/*.jsx)

all: learners-bundle.js
	@echo -n

learners-bundle.js: learners.js $(js_deps)
	browserify --debug -t reactify learners.js  > learners-bundle.js && echo "Done"

