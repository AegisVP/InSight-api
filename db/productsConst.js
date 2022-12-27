const { DB_PATH } = require('../config');

class Products {
  constructor() {
    this.items = [];
  }
  
  async init() {
    await this.fullUpdate();
  }
  
  async fullUpdate() {
    // /////////////////////////////////////  constants block  /////////////////////////////////////
    
    const db = 'InSight'; // define DB
    const collection = 'products'; // define collection
    
    // ////////////////////////////////////  initial data fetch  ////////////////////////////////////
    
    // connecting to the DB
    const MongoClient = require('mongodb').MongoClient;
    const client = new MongoClient(DB_PATH, { useNewUrlParser: true });
    await client.connect();
    
    // getting current data from the collection and asign it to a local variable
    const allProductsCursor = client.db(db).collection(collection);
    this.items = await allProductsCursor.find().toArray();

    // ////////////////////////////////////  watch for updates  ////////////////////////////////////

    const options = { fullDocument: 'updateLookup' };
    const productsStream = allProductsCursor.watch([], options);

    // when a change has happened at the DB
    productsStream.on('change', change => {
      // maps the existing array of items
      this.items = this.items.map(product =>
        // checks ID of each array item against ID of changed items from DB and returns either the existing array item or the changed DB item
        String(product._id) === String(change.fullDocument._id) ? change.fullDocument : product
      );
    });
  }
}

const products = new Products()

module.exports = products;
