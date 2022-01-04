const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Brand } = require("../database/schemas/brandSchema");

module.exports = function (app) {
  app.get("/brands", async (req, res) => {
    res.send(await Brand.find());
  });

  app.post("/brands", async (req, res) => {
    const body = req.body;

    const newBrand = new Brand({
      name: body.name,
    });

    await newBrand.save();
    res.send({ message: "Brand saved successfully!" });
  });

  app.delete("/brands/:id", async (req, res) => {
    const id = req.params.id;
    await Brand.deleteOne({ _id: ObjectId(id) });
    res.send({ message: "Brand deleted successfully!" });
  });

  app.put("/brands/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    await Brand.updateOne({ _id: ObjectId(id) }, { name: body.name });
    const brand = await Brand.find({ _id: ObjectId(id) });
    res.send(brand);
  });
};
