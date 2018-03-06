/**
 * Lets Rock
 * https://github.com/ocleo1
 * 
 * @providesModule Network
 * @flow
 */

export function getData() {
  const requestURL = 'https://plgaia-staging.herokuapp.com/api/v1/post_get_active/4Wa0y74X1mAKKIo2qgiWii';

  return new Promise((resolve, reject) => {
    fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Token ZVKgYbjoOxoM9fvuhDvQOAtt'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      const results = responseJson['get_active'];
      resolve(results);
    })
    .catch((error) =>{
      console.error(error);
      reject(error);
    });
  });
}