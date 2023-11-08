import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      username
      age
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUser($id: ID) {
    getUser(id: $id) {
      id
      username
      age
    }
  }
`;

// # query {
// #   getAllUsers {
// #     id, username, age
// #   }
// # }
// #   query {
// #     getUser(id: 2) {
// #       id,
// #       username,
// #       age,

// #     }
// #   }

// # mutation {
// #   deleteUserById(id: 2) {
// #     id, username, posts {
// #       id, title, content
// #     }
// #   }
// # }
// # mutation {
// #   createUser(input: {
// #     username: "Jack",
// #     age: 40,
// #     posts:[
// #       {
// #         id:1,
// #         title:"gello",
// #         content:"test query"
// #       }
// #     ]
// #   }) {
// #     id, username, posts {
// #       id, title, content
// #     }
// #   }
// # }
