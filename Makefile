###########################################################
# Nomplate build script
###########################################################

# Operating System (darwin or linux)
PLATFORM:=$(shell uname | tr A-Z a-z)
# make dev-install ARCH=armv7l to get the right version of nodejs
# Ubuntu desktop is "x86_64", Raspberry Pi is "armv7l", Nodejs
# requires "x86_64" to be "x64"
ARCH:=${shell arch | sed "s/86_//g"}
PROJECT_ROOT=$(shell git rev-parse --show-toplevel)
CLIENT_OUTPUT=client
SERVER_OUTPUT=server

# Nodejs
# https://nodejs.org/dist/v10.9.0/node-v10.9.0-linux-x64.tar.xz
NODE_VERSION=16.13.0
NODE=lib/nodejs/bin/node
NPM=lib/nodejs/bin/npm

# Derived values
NODE_FILENAME=node-v$(NODE_VERSION)-$(PLATFORM)-$(ARCH)
TEST_FILES=`find . -name "*_test.js" ! -path "*node_modules*"`
NODE_MODULES_BIN=node_modules/.bin

# Node utilities
ESLINT=$(NODE_MODULES_BIN)/eslint
MOCHA=$(NODE_MODULES_BIN)/_mocha
ESBUILD=$(NODE_MODULES_BIN)/esbuild

.PHONY: test test-w dev-install build build-module lint clean serve

dist:
	mkdir dist

build: dist/$(CLIENT_OUTPUT).js dist/$(CLIENT_OUTPUT).min.js dist/$(CLIENT_OUTPUT).min.gz

# Run all JavaScript tests
test: ${NODE}
	${MOCHA} --reporter dot ${TEST_FILES}

test-w: ${NODE}
	${MOCHA} --reporter dot ${TEST_FILES} -w

build-module: src/*

publish: clean build
	npm publish

dist/$(CLIENT_OUTPUT).js: dist client.js src/* Makefile
	$(ESBUILD) client.js --bundle --outfile=dist/$(CLIENT_OUTPUT).js

dist/$(CLIENT_OUTPUT).min.js: dist client.js src/* Makefile
	$(ESBUILD) client.js --bundle --minify --outfile=dist/$(CLIENT_OUTPUT).min.js

dist/$(CLIENT_OUTPUT).min.gz: dist/$(CLIENT_OUTPUT).min.js
	gzip --best -c dist/$(CLIENT_OUTPUT).min.js > dist/$(CLIENT_OUTPUT).min.gz

dist/express.js:
	$(ESBUILD) express.js --bundle --target=node$(NODE_VERSION) --outfile=dist/express.js

lint: Makefile
	$(ESLINT) --config $(PROJECT_ROOT)/.eslintrc.json .

module-install:
	$(NPM) install

# Serve for development with nodemon
serve-dev: build
	NODE_ENV=${NODE_ENV} \
	DEBUG=log,warn,error,fatal \
	nodemon -w src -w test -w script --exec "make clean build && node ./server.js"

serve: build
	$(NODE) ./server.js

integrate: clean lint test build

clean:
	rm -rf dist
	rm -rf tmp
	rm -f .tmp-view.html

# Intall development dependencies (OS X and Linux only)
dev-install: $(NODE) $(NODE_MODULES_BIN)

# Download and unpack the Node binaries into lib/nodejs.
$(NODE):
	mkdir -p tmp
	wget -O tmp/nodejs.tar.xz --no-check-certificate "https://nodejs.org/dist/v$(NODE_VERSION)/$(NODE_FILENAME).tar.xz"
	touch tmp/nodejs.tar.xz
	mkdir -p lib/nodejs
	tar -xvf tmp/nodejs.tar.xz -C lib/nodejs --strip 1
	touch lib/nodejs/README.md
	rm -rf tmp

# Install npm dependencies
$(NODE_MODULES_BIN): $(PROJECT_ROOT)/package.json
	$(NPM) install --development

