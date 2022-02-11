const { Schema, model } = require("mongoose");
const { isEmail, isEmpty } = require("validator");

const developerSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    index: true,
    validate: {
      validator: function (v) {
        return !isEmpty(v);
      },
      message: "The name cannot be empty",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: {
      validator: function (v) {
        return isEmail(v);
      },
      message: "The email address isn't valid",
    },
  },
  category: {
    type: String,
    enum: ["Front", "Back", "Data", "Mobile"],
    required: true,
  },
  phone: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (v) {
    //     return isMobilePhone(v);
    //   },
    //   message: "The phone number isn't valid",
    // },
  },
  dates: [
    {
      type: Date,
      min: "2022-02-28",
      max: "2022-03-03",
    },
  ],
});

developerSchema.virtual("days").get(function () {
  return this.dates ? this.dates.length : 0;
});

developerSchema.options.toObject = {
  virtuals: true,
  getters: true,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    Object.keys(ret).forEach((key) => {
      if (key[0] === "_" || key === "dates") delete ret[key];
    });

    return ret;
  },
};

module.exports = new model("Developer", developerSchema);
