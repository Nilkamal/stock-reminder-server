const cron = require("node-cron");
const mailer = require("nodemailer");
const { Mobile } = require("./database/schemas/mobileSchema");
const { app } = require("./server");

require("./routes/brandRoutes")(app);
require("./routes/mobileRoutes")(app);
require("./database/db");

cron.schedule("12 21 * * *", () => {
  console.log("Task is running every minute " + new Date());
  sendEmail();
});

const transporter = mailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "nilkamalsha75@gmail.com",
    pass: "uiieztbhxkkblvoy",
  },
});

async function sendEmail() {
  const mobiles = await Mobile.find().populate("brand");
  console.log(mobiles);
  const today = new Date();
  const totalDaysRemaining = 10;

  let message = "<h2>Following mobiles are due for replacement:</h2><ul>";
  mobiles.forEach((mobile) => {
    const purchaseDate = mobile.purchaseDate;
    let timeDiff = purchaseDate - today;

    timeDiff /= 1000;
    const days = Math.floor(timeDiff / (3600 * 24));
    if (days <= totalDaysRemaining && purchaseDate > today) {
      message += `<li>${mobile.model} - ${mobile.brand.name} - ${
        mobile.IMEI
      } - ${mobile.purchaseDate.toString(
        "DD-MM-YYYY"
      )} - days remaining: ${days}</li>`;
    }
  });
  message += "</ul>";
  console.log(message);
  transporter
    .sendMail({
      from: '"Nilkamal" <noreply@stockreminder.com>',
      to: '"Nilkamal" <nilkamalsha75@gmail.com>',
      subject: "Scheduled Email",
      html: message,
    })
    .then(() => console.log("email sent", new Date()));
}
app.listen(4000, () => {
  console.log("APP IS RUNNING ON PORT 4000");
});
