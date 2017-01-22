#!/usr/bin/env bash

clear
toilet -f smmono9 -t --gay Starting the test console
toilet -f smmono9 -t --gay Using it to start two
toilet -f smmono9 -t --gay concurrent clients

echo ./bin/test-dashboard.sh etc/a3a4.json
echo clients: c0, c1
echo make c0, c1 use p0, p1
echo start c0, c1
echo ""