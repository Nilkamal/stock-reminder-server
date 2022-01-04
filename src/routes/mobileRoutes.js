const { ObjectId } = require("mongodb");
const { Mobile } = require("../database/schemas/mobileSchema");

module.exports = function (app) {
  // Read all the mobiles
  app.get("/mobiles", async (req, res) => {
    const mobiles = await Mobile.find().populate("brand");
    console.log(mobiles);

    res.send(mobiles);
  });

  app.get("/mobiles/:id", async (req, res) => {
    const mobile = await Mobile.findOne({ _id: req.params.id }).populate(
      "brand"
    );
    console.log(mobile);

    res.send(mobile);
  });

  app.post("/mobiles/", async (req, res) => {
    try {
      const { model, purchaseDate, brand, IMEI, _id } = req.body;
      if (_id && Mobile.exists({ _id: _id })) {
        console.log("exists");
        await Mobile.updateOne({ _id }, { model, purchaseDate, brand, IMEI });
      } else {
        console.log("not exists");
        const newMobile = new Mobile({
          model,
          purchaseDate,
          brand,
          IMEI,
        });
        await newMobile.save();
      }
      res.send({ message: "Mobile saved successfully!" });
    } catch (e) {
      console.log(e);
      res.send({ error: e });
    }
  });

  app.delete("/mobiles/:id", async (req, res) => {
    try {
      await Mobile.deleteOne({ _id: req.params.id });
      res.send({ message: "New mobile deleted successfully!" });
    } catch (e) {
      res.send({ errorMessage: "Error while deleting mobile" });
    }
  });

  app.put("/mobiles/:id", async (req, res) => {
    const { model, purchaseDate, brand, IMEI } = req.body;
    const id = req.params.id;
    await Mobile.updateOne({ _id: id }, { model, purchaseDate, brand, IMEI });
    const updatedMobile = await Mobile.find({ _id: ObjectId(id) });
    res.send(updatedMobile);
  });
};
