/**
 * Lets Rock
 * https://github.com/ocleo1
 * 
 * @providesModule DBUtils
 * @flow
 */

import _ from 'lodash';
import PouchDB from 'pouchdb-core';
PouchDB.plugin(require('pouchdb-adapter-asyncstorage').default);

const DB_NAME = 'mydb';
var db = new PouchDB(DB_NAME, {adapter: 'asyncstorage'});
// console.log(db.adapter);

export function destroyDB() {
  db.destroy(DB_NAME).then((response) => {
    console.log(response);
  }).catch(function (err) {
    console.log(err);
  });
}

export function resetDB(data) {
  db.destroy(DB_NAME).then((response) => {
    let docs = _.cloneDeep(data);
    docs.forEach((doc, index) => {
      doc._id = doc.hasOwnProperty('content_id') ? doc.content_id : `doc${index}`;
    });
    db = new PouchDB(DB_NAME, {adapter: 'asyncstorage'});
    return db.bulkDocs(docs);
  }).then((result) => {
    console.log(result);
  }).catch(function (err) {
    console.log(err);
  });
}

export function allRecords() {
  return new Promise((resolve, reject) => {
    db.allDocs({
      include_docs: true
    }).then(function (result) {
      let rows = result.rows || [];
      let docs = rows.map((row) => row.doc || {});
      resolve(docs);
    }).catch(function (err) {
      console.log(err);
      reject(err);
    });
  });
}
