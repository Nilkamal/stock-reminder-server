const mongoose = require("mongoose");

const mobileSchema = new mongoose.Schema({
  model: String,
  purchaseDate: Date,
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: false,
  },
  IMEI: String,
});

const Mobile = mongoose.model("Mobile", mobileSchema);

module.exports = {
  Mobile,
};
