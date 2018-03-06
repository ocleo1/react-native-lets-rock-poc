/**
 * Lets Rock
 * https://github.com/ocleo1
 * 
 * @providesModule Database
 * @flow
 */

import _ from 'lodash';
import PouchDB from 'pouchdb-core';
PouchDB.plugin(require('pouchdb-adapter-asyncstorage').default);

const db = new PouchDB('mydb', {adapter: 'asyncstorage'});
// console.log(db.adapter);

export function destroyDB() {
  db.destroy().then((response) => {
    console.log(response);
  }).catch(function (err) {
    console.log(err);
  });
}

export function resetDB(data) {
  return new Promise((resolve, reject) => {
    db.destroy().then((response) => {
      let docs = _.cloneDeep(data);
      docs.forEach((doc) => _id = content_id);
      return db.bulkDocs(docs);
    }).then((result) => {
      console.log(result);
      resolve(result);
    }).catch(function (err) {
      console.log(err);
      reject(err);
    });
  });
}

export function allRecords() {
  return new Promise((resolve, reject) => {
    db.allDocs({
      include_docs: true
    }).then(function (result) {
      resolve(result);
    }).catch(function (err) {
      console.log(err);
      reject(err);
    });
  });
}
