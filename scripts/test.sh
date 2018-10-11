#!/bin/bash

set -e

# run tests for FE, socket-server, and API
cd app
npm test 
cd ../api
npm test
cd ../socket-server
npm test
cd ..
