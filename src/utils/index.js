exports.addFilm = async (collection, filmObject) => {
  try {
    // add database entry using built in method insertOne
    //and passing the filmObj entered by the user
    const addEntry = await collection.insertOne(filmObject);
    console.log(addEntry);
  } catch (error) {
    console.log(error);
  }
};
exports.listFilms = async (collection) => {
  try {
    const filmList = await collection.find().toArray();
    console.log(filmList);
  } catch (error) {
    console.log(error);
  }
};
// //Create function for updating one or more database entries

exports.upFilm = async (collection, update, change) => {
  try {
    // Using collection, call updateOne using criteria
    // Modifying second variable to { $set : {[Key/Value pairs to change]}}
    const updated = await collection.updateOne(update, { $set: change });
    console.log(updated);
  } catch (error) {
    console.log(error);
  }
};
// Create function to delete one or more database entries
exports.delFilm = async (collection, target) => {
    try{
        //deleting identifier which is target variable
    const deleted = await collection.deleteOne(target);
    console.log(deleted);
} catch (error){
    console.log(error);
}
}