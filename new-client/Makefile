
build: once
	watchify --debug -t reactify -t bulkify index.js -o build/bundle.js -v

dev:
	browserify --debug -t reactify -t bulkify -t fusion pages/index.jsx -o dev/bundle.js

css:
	lessterfy pages/index.jsx build/mapped.css -t reactify -t bulkify

once:
	browserify --debug -t reactify -t bulkify index.js -o build/bundle.js

# build: build/bundle.js
# @echo -n

# JSX = $(wildcard pages/*.jsx)
# JS = $(wildcard pages/*.js) $(wildcard back/*.js) $(wildcard node_modules/react-router/*.js) $(wildcard node_modules/general-ui/*.js) $(wildcard node_modules/general-ui/*.jsx)

LESS = $(wildcard less/*.less)

less: build/bundle.css
	@echo -n

build/bundle.css: $(LESS)
	lessc less/index.less build/bundle.css

clean:
	rm build/bundle.js

.PHONY: build less dev

