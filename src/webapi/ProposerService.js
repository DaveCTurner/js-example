const {Cache} = require("gryadka/src/Cache");
const {AcceptorClient} = require("gryadka/src/AcceptorClient");
const {Proposer} = require("gryadka/src/Proposer");
const {redisAsyncClient} = require("gryadka/src/utils/redisAsyncClient");

const express = require("express");
const bodyParser = require("body-parser");

class ProposerService {
    async start(settings) {
        const cache = new Cache(settings.id);
        this.acceptors = settings.acceptors.map(x => new AcceptorClient(x));
        this.acceptors.forEach(x => x.start());

        const proposer = new Proposer(cache, this.acceptors, settings.quorum);

        const app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        const router = express.Router();

        router.route("/change").post(function(req, res) {
            try {
                var change = require("./mutators/" + req.body.change.name)(req.body.change.args);
                var query = require("./mutators/" + req.body.query.name)(req.body.query.args);

                proposer.changeQuery(req.body.key, change, query, req.body.extra).then(x => {
                    res.json(x);
                });
            } catch (e) {
                console.info(e);
            }
        });

        app.use('/', router);

        this.server = app.listen(settings.port);

        return this;
    }

    close() {
        this.acceptors.forEach(x => x.close());
        this.redis.quit();
        this.server.close();
    }
}

exports.ProposerService = ProposerService;