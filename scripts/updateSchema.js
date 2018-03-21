#!/usr/bin/env babel-node
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { introspectionQuery  }  = require('graphql/utilities');

const env = require('node-env-file');

process.env.REACT_APP_GRAPHQL_HOST = "localhost";
process.env.REACT_APP_GRAPHQL_PATH = "/graphql";

try {
  env(__dirname + '/../.env.local', { overwrite: true });
} catch (e) {}


console.log('Host ', `${process.env.REACT_APP_GRAPHQL_HOST}${process.env.REACT_APP_GRAPHQL_PATH}`);

const options = {
  host: process.env.REACT_APP_GRAPHQL_HOST,
  port: 443,
  path: process.env.REACT_APP_GRAPHQL_PATH,
  method: 'POST',
  rejectUnauthorized: false,
  requestCert: true,
  agent: false,
  headers: {
    'Content-Type': 'application/json',
  },
};
const req = https.request(options, (response) => {
  const data = [];
  response.setEncoding('utf8');
  response.on('data', (chunk) => {
    data.push(chunk);
  });
  response.on('end', () => {
    let result;
    try {
      result = JSON.parse(data.join(''));
    } catch (e) {
      console.error('Error while parse JSON RESPONSE');
      console.log('response', data);
      return;
    }
    if (result.errors) {
      console.error(
        'Error introspecting schema: ',
        JSON.stringify(result.errors, null, 2),
      );
    } else {
      fs.writeFileSync(
        path.join(__dirname, './../src/module/relay/schema.json'),
        JSON.stringify(result, null, 2),
      );
      console.log('GraphQL schema has been updated');
    }
  });
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

req.write(JSON.stringify({ query: introspectionQuery }));
req.end();
