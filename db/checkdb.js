const {MongoClient} = require('mongodb');

async function showDatabases(client){
    const dbList = await client.db().admin().listDatabases();
    console.log("dbs",dbList);
    dbList.databases.forEach(db => console.log(` - ${db.name}`));
}

module.exports =  async function connectToMongoDb(){
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);
    await client.connect(); // connection establishement 
    await showDatabases(client);
    await  client.close();
}