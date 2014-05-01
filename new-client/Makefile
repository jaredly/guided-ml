
build: once
	watchify --debug -t reactify index.js -o build/bundle.js -v

css:
	browserify -p [ splitlessify --filename build/new-css.css --watch ] index.js -o /dev/null

once:
	browserify --debug -t reactify index.js -o build/bundle.js

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

.PHONY: build less

