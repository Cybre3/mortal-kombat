const MongoClient = require("mongodb").MongoClient;

async function main() {
  const uri =
    "mongodb+srv://Raiden:earthrealm_warriors@cluster0.dzllk8p.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await findCharacters(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  // const characterNames = await client.db("characters").collection("names");

  console.log("Databases:");
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });

  // console.log("Characters Names:");
  // characterNames.db.forEach((char) => console.log(`- ${char._id}`));
  // console.log(characterNames)
}

async function findCharacters(client, nameOfCharacter) {
  // const result = await client.db("characters").collection("names").findOne({name: nameOfCharacter});
  //  await client.db("characters").collection("names").find().toArray(function(err, docs){
  //     console.log(JSON.stringify(docs))
  //   })
  const url =
    "mongodb+srv://Raiden:earthrealm_warriors@cluster0.dzllk8p.mongodb.net/?retryWrites=true&w=majority";

  await MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("characters");
    dbo.collection("names").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
  // const characterNames = await client.db("characters").collection("names");

  // result.forEach((char) => console.log(`- ${char.name}`));

  // if (result) {
  //   console.log(`Found character ${nameOfCharacter}`);
  //   console.log(result);
  // } else {
  //   console.log(`No Character found with name ${nameOfCharacter}`);
  // }
}
