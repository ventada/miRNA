const mongoose = require("mongoose");

const DB = async () => {
  try {
    const con = await mongoose.connect("mongodb://127.0.0.1:27017/miRNA");
    // const con = await mongoose.connect(
    //   "mongodb://admin:BioGame123@116.203.207.65/miRNA"
    // );
    // const con = await mongoose.connect(
    //   "mongodb+srv://ventada:RG6ZW3vS72lWgd3t@cluster0.pdm3vpv.mongodb.net/miRNA?retryWrites=true&w=majority",

    //   {}
    // );

    // console.log(con);
    console.log(
      "conneced to database",
      con.connection.port,
      con.connection.name
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = DB;
