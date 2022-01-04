const mongoose = require("mongoose");
const { Brand } = require("./schemas/brandSchema");
const { Mobile } = require("./schemas/mobileSchema");
const { ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://nilkamal:nilkamal@cluster0.2ywvm.mongodb.net/test?retryWrites=true&w=majority";

main().catch((error) => console.log(error));

async function main() {
  await mongoose.connect(uri);

  // const samsung = new Brand({
  //   name: "SAMSUNG",
  // });

  // await samsung.save();

  // const oppo = new Brand({
  //   name: "OPPO",
  // });

  // await oppo.save();

  // const vivo = new Brand({
  //   name: "VIVO",
  // });

  // await vivo.save();

  // const brand = await Brand.find({ name: "SAMSUNG" });
  // console.log(brand);
  // const a12 = new Mobile({
  //   model: "SAMSUNG a12",
  //   purchaseDate: "2021-03-12",
  //   brand: ObjectId(brand._id),
  //   IMEI: "1221212121212S",
  // });

  // await a12.save();

  // console.log(await Mobile.find({}));
}
