const yargs = require("yargs");

const { connection, client } = require("./db/connection");

const { addFilm, listFilms, upFilm, delFilm } = require("./utils/index");

const app = async (yargsObj) => {
  const collection = await connection();
  if (yargsObj.add) {
    await addFilm(collection, {
      title: yargsObj.title,
      actor: yargsObj.actor,
      director: yargsObj.director,
    });
    console.log("success, entry added");
  } else if (yargsObj.list) {
    await listFilms(collection);
  } else if (yargsObj.update) {
    // criteria variable based on the value of .update
    let update = { title: yargsObj.update };
    // empty object to store changes in
    let change = {};

    // Check if the identifier exists, if yes add it to the changes object
    if (yargsObj.title) {
      //using spread operator instead of object assign
      change = { ...change, title: yargsObj.title };
    }
    if (yargsObj.actor) {
      change = { ...change, actor: yargsObj.actor };
    }
    if (yargsObj.director) {
      change = { ...change, director: yargsObj.director };
    }
    // Call the updateFilm command, pass it the collection,
    // update and change values.
    await upFilm(collection, update, change);
    console.log("Entry updated");
  } else if (yargsObj.delete) {
    // identifier variable
    let target = { title: yargsObj.delete };
    //call delFilm and pass it collection and criteria
    await delFilm(collection, target);
    console.log("Entry deleted");
  } else {
    console.log("Incorrect command, try again");
  }
  await client.close();
};

app(yargs.argv);
