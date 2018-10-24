#!/bin/bash

set -e

# run tests for FE, socket-server, and API
cd app
echo 'Running UI tests...'
npm test 
cd ../api
echo 'Running API tests...'
npm test
cd ../socket-server
echo 'Running socket-server tests...'
npm test
cd ..
