const app = require("./app");
const connectDataBase = require("./config/database");

// uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server`);
  process.exit(1);
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//connecting to database
connectDataBase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running `);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server`);
  server.close(() => {
    process.exit(1);
  });
});
