#!/bin/bash

# this script gets the API gateway endpoints for users and tasks and the DNS of the socket-server for FE
aws cloudformation list-exports > config.json
node scripts/parse.js
eval "$(cat config.txt)" # this sets the environment variables
rm config.txt && rm config.json