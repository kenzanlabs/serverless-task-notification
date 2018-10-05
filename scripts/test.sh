#!/bin/bash

cd app
npm test 
cd ../api
npm test
cd ../socket-server
npm test
cd ..
