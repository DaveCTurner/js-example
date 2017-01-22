## End-to-end testing

Prerequisites: redis, nodejs

#### Membership change

Please follow the link to see 
[a screencast about membership change from 3 to 4 acceptors](https://asciinema.org/a/7ewvgpfkyh8190q1ifumauekm). 
It includes:

  * generation of Redis's and Gryadka's configs from a compact description
  * starting the system
  * using test console to run clients, monitor thier progress and detecting consistency violation
  * stopping acceptors to simulate crashes
  * on the fly membership change from 3 to 4 acceptors


<a href="https://asciinema.org/a/7ewvgpfkyh8190q1ifumauekm" target="_blank"><img src="/img/a3a4.png" width="979"/></a>

#### Manual quering Gryadka with cURL

1. Clone this repo
2. cd gryadka
3. npm install
4. ./bin/pseudo-distribute.sh etc/p2a3.json
5. redis-server deployment/a0/redis.conf &
6. redis-server deployment/a1/redis.conf &
7. redis-server deployment/a2/redis.conf &
8. ./bin/gryadka.sh deployment/proposers/p0.json &
9. Test a sample key/value storage
    * curl -w "\n" -H "Content-Type: application/json" -X POST -d '{"key": "answer", "change": {"name": "kv-init","args": "unknown"},"query": {"name": "kv-read","args": null}}' http://localhost:8079/change
    * curl -w "\n" -H "Content-Type: application/json" -X POST -d '{"key": "answer", "change": {"name": "kv-update","args": {"version":0, "value": 42}},"query": {"name": "kv-read","args": null}}' http://localhost:8079/change
    * curl -w "\n" -H "Content-Type: application/json" -X POST -d '{"key": "answer", "change": {"name": "kv-id","args": null},"query": {"name": "kv-read","args": null}}' http://localhost:8079/change
    * curl -w "\n" -H "Content-Type: application/json" -X POST -d '{"key": "answer", "change": {"name": "kv-reset","args": "to pass butter"},"query": {"name": "kv-read","args": null}}' http://localhost:8079/change
