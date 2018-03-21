/**
 * @flow
 * @relayHash a4e2086fdfee1f2ea21b8540bb00d477
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type UserInfo_user$ref = any;
export type UserInfoRefetchQueryVariables = {| |};
export type UserInfoRefetchQueryResponse = {|
  +viewer: {|
    +user: ?{|
      +$fragmentRefs: UserInfo_user$ref,
    |},
  |},
|};
*/


/*
query UserInfoRefetchQuery {
  viewer {
    user {
      ...UserInfo_user
      id
    }
    id
  }
}

fragment UserInfo_user on User {
  id
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "UserInfoRefetchQuery",
  "id": null,
  "text": "query UserInfoRefetchQuery {\n  viewer {\n    user {\n      ...UserInfo_user\n      id\n    }\n    id\n  }\n}\n\nfragment UserInfo_user on User {\n  id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "UserInfoRefetchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "UserInfo_user",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "UserInfoRefetchQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              v0
            ]
          },
          v0
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '4e65a090fb124136677b188c3a20a526';
module.exports = node;
