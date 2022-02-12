const { connect } = require("mongoose");
let { MONGO_URL } = require("@config");

if (!MONGO_URL)
  throw new Error(
    "I need a config.json file containing a valid MONGO_URL to run"
  );
if (process.env.NODE_ENV === "test") MONGO_URL = `${MONGO_URL}-test`;
MONGO_URL = `${MONGO_URL}?retryWrites=true&w=majority`;

module.exports = {
  connect: () => connect(MONGO_URL),
  disconnect: (mongoose) => mongoose.connection.close(),
};
