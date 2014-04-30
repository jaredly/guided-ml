
build: build/bundle.js
	@echo -n

JSX = $(wildcard pages/*.jsx)
JS = $(wildcard pages/*.js) $(wildcard back/*.js) $(wildcard node_modules/react-router/*.js) $(wildcard node_modules/general-ui/*.js) $(wildcard node_modules/general-ui/*.jsx)

build/bundle.js: $(JSX) $(JS)
	browserify --debug -t reactify index.js > build/bundle.js

clean:
	rm build/bundle.js

.PHONY: build

