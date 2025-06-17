import {enablePromise, openDatabase} from 'react-native-sqlite-storage';
import {Place} from '../models/place';
enablePromise(true);
export const getDBConnection = async () => {
  const dbInstance = openDatabase({name: 'places.db', location: 'default'});
  return dbInstance;
};

const tableName = 'places';

export const createTable = async () => {
  const db = await getDBConnection();
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    imageUri TEXT NOT NULL,
    address TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL
  );`;

  await db.executeSql(query);
};

export const getPlaces = async () => {
  const db = await getDBConnection();
  try {
    let places = [];
    const results = await db.executeSql(`SELECT * FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        places.push(
          new Place(
            result.rows.item(index).title,
            result.rows.item(index).imageUri,
          {
              address:  result.rows.item(index).address,
              lat: result.rows.item(index).lat,
              lng: result.rows.item(index).lng,
            },
            result.rows.item(index).id,
          ),
        );
      }
    });

    return places;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get todoItems !!!');
  }
};
export const savePlaces = async place => {
  const db = await getDBConnection();

  const insertQuery = `INSERT INTO ${tableName} (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`;

  try {
    return await db.executeSql(insertQuery, [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    ]);
    
  } catch (error) {
    console.error('Failed to insert places:', error);
    throw error;
  }
};

export const getPlaceDetails = async (id) => {
  const db = await getDBConnection();

  try {

    const results = await db.executeSql(`SELECT * FROM ${tableName} WHERE id =?`,[id]);
    const item=results[0].rows.item(0)
    const place=new Place(item.title,item.imageUri,{address:item.address,lat:item.lat,lng:item.lng},item.id)

    return item;
     // or return `places` if you expect an array
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get place details!');
  }
};

export const deleteTable = async () => {
  const db = await getDBConnection();
  const query = `drop table ${tableName}`;

  const response = await db.executeSql(query);
  console.log(response);
};
