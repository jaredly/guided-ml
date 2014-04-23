
serve:
	@beefy index.js -- -t reactify

less: index.css
	@echo -n

less_sources = $(wildcard *.less) $(wildcard **/*.less)

index.css: $(less_sources) index.less
	lessc index.less > index.css

build: bundle.js
	@echo -n

js_sources = $(wildcard **/*.js) index.js learners.js features.js rest-dao.js
json_sources = $(wildcard **/*.json)
jsx_sources = $(wildcard **/*.jsx)

bundle.js: index.js $(js_sources) $(jsx_sources) $(json_sources) features-raw.json learners-raw.json
	browserify --debug -t reactify index.js > bundle.js && echo "Done"

.PHONY: serve less
