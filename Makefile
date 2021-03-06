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
NODE_VERSION=14.15.0
NODE=lib/nodejs/bin/node
NPM=lib/nodejs/bin/npm

# Derived values
NODE_FILENAME=node-v$(NODE_VERSION)-$(PLATFORM)-$(ARCH)
TEST_FILES=`find . -name "*_test.js" ! -path "*node_modules*"`
NODE_MODULES_BIN=node_modules/.bin

# Node utilities
ESLINT=$(NODE_MODULES_BIN)/eslint
MOCHA=$(NODE_MODULES_BIN)/_mocha
WEBPACK=$(NODE_MODULES_BIN)/webpack
BABEL=$(NODE_MODULES_BIN)/babel
BABEL_NODE=$(NODE_MODULES_BIN)/babel-node
WEBPACK_CLIENT_CONFIG=webpack-client.config.js

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
	$(WEBPACK) --mode development --config $(WEBPACK_CLIENT_CONFIG) client.js -o dist/$(CLIENT_OUTPUT).js

dist/$(CLIENT_OUTPUT).min.js: dist client.js src/* Makefile
	$(WEBPACK) --mode production --optimize-minimize --config $(WEBPACK_CLIENT_CONFIG) client.js -o dist/$(CLIENT_OUTPUT).min.js

dist/$(CLIENT_OUTPUT).min.gz: dist/$(CLIENT_OUTPUT).min.js
	gzip --best -c dist/$(CLIENT_OUTPUT).min.js > dist/$(CLIENT_OUTPUT).min.gz

dist/$(SERVER_OUTPUT).js: Makefile
	$(WEBPACK) --config $(WEBPACK_SERVER_CONFIG) express.js dist/$(SERVER_OUTPUT).js

lint: Makefile
	$(ESLINT) --config $(PROJECT_ROOT)/.eslintrc.json .

module-install:
	$(NPM) install

# Create a new development database
pg-init:
	initdb data/development

# Start the postgres db server with the development datastore.
# If pg_ctl is not available on a Linux workstation, check the following instructions:
# https://stackoverflow.com/questions/24757457/cannot-use-commands-postgres-or-pg-ctl
pg-start:
	pg_ctl -D data/development -l log/pg_development start

# Stop the postgres db server
pg-stop:
	pg_ctl -D data/development stop

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

