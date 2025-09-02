import mongoose from "mongoose";
import app from "./app";
import config from "./app/config/index";
import seedAdmin from "./app/DB";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    // create the admin
    await seedAdmin();

    console.log("Data base connected successfully");

    app.listen(config.port, () => {
      console.log(`App running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
