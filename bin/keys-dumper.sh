#!/bin/bash

# args example: etc/p2a3.json a0
node-nightly --harmony node_modules/gryadka/src/paxos/membership/keys-dumper.js $1 $2
