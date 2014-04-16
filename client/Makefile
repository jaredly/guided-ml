
serve:
	@beefy index.js -- -t reactify

less: index.css
	@echo -n

index.css: index.less
	lessc index.less > index.css

.PHONY: serve less
