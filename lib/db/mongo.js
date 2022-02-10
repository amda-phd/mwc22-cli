const { connect } = require("mongoose");

const uri = () => {
  const {
    MONGO_URL,
    MONGO_NAME,
    MONGO_PORT,
    MONGO_HOST,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_CLUSTER,
  } = process.env;
  const slug = "mongodb";
  const query = "?retryWrites=true&w=majority";

  if (MONGO_URL) {
    return MONGO_URL;
  }
  if (!MONGO_NAME) {
    return;
  }
  if (MONGO_HOST && MONGO_NAME) {
    return `${slug}://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}${query}`;
  }
  if (MONGO_USER && MONGO_PASSWORD && MONGO_CLUSTER) {
    return `${slug}+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/${MONGO_NAME}${query}`;
  }
};

module.exports = () => {
  const url = uri();
  if (!url) {
    throw new Error("MongoDB variables incorrect or incomplete");
  }

  return connect(uri(), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
};
