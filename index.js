require("dotenv").config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const preloadDogs = require("./src/controllers/preloadDogs");
const port = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  await preloadDogs();
  server.listen(port, () => {
    console.log("%s listening at " + port); // eslint-disable-line no-console
  });
});
