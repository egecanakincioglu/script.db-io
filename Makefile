deps:
	npm install

clean:
	rm -f package-lock.json
	rm -rf node_modules

rebuild: clean deps
