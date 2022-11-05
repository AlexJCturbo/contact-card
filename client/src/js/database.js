import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initDb = async function () {
  //Creating new database named 'contact_db' which will be using version 1 of the database
  openDB('contact_db', 1, {
    //Adding database schema if it has not already been initialized
    upgrade(db) {
      if (db.objectStoreNames.contains('contacts')) {
        console.log('contacts store already exists');
        return;
      }
      //Create a new object store for the data and give it a key name of 'id' which will increment automatically
      db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
      console.log('contacts store created');
    }
  });
};

export const getDb = async function () {
  console.log('GET from the database');
  //Connect to the IndexedDB and version
  const dbConnect = await openDB('contact_db', 1);

  //Create a new transaction and specify the store and data privileges
  const tx = dbConnect.transaction('contacts', 'readonly');

  //Open up the desired object store
  const store = tx.objectStore('contacts');

  //Use .getAll() method to get all data in the database.
  const request = store.getAll();

  //Confirm the request.
  const result = await request;
  console.log('result.value', result);
  return result;

  // const contactDb = await openDB('library_db', 1.0);
  // const tx = contactDb.transaction('transactionOne', 'readonly');
  // const store = tx.objectStore('transactionOne');
  // const request = store.getAll();
  // const result = await request;
  // return result;
};

export const postDb = async (name, email, phone, profile) => {
  console.log('POST to the database');

  //Create a connection to the database and specify the version we want to use
  const dbConnect = await openDB('contact_db', 1);

  //Create a new transaction and specify the store and data privileges
  const tx = dbConnect.transaction('contacts', 'readwrite');

  //Open up the desired object store
  const store = tx.objectStore('contacts');

  //Use .add() method on the store and pass in the content
  const request = store.add({ name: name, email: email, phone: phone, profile: profile });

  //Get confirmation of the request
  const result = await request;
  console.log('Data saved to the database', result);
}