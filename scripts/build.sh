#!/bin/bash

aws cloudformation list-exports | jq -cr ".Exports" > config.json
node scripts/parse.js
eval "$(cat config.txt)"
cd app
npm run build
cd ..

