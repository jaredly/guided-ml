
serve:
	@beefy index.js -- -t reactify

less: index.css
	@echo -n

index.css: index.less
	lessc index.less > index.css

build: bundle.js
	@echo -n

js_sources = $(wildcard **/*.js)
json_sources = $(wildcard **/*.json)
jsx_sources = $(wildcard **/*.jsx)

bundle.js: index.js $(js_sources) $(jsx_sources) $(json_sources) features-raw.json
	browserify --debug -t reactify index.js > bundle.js && echo "Done"

.PHONY: serve less
