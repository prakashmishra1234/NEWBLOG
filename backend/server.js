const app = require("./app");
const connectDataBase = require("./config/database");

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//connecting to database
connectDataBase();

app.listen(process.env.PORT, () => {
  console.log(`server is running `);
});
