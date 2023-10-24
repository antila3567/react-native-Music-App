import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($input: UserInput) {
    createUser(input: $input) {
      id
      username
      age
    }
  }
`;

export const DELETE_USER_BY_ID = gql`
  mutation deleteUserById($id: ID) {
    deleteUserById(id: $id) {
      id
      username
      posts {
        id
        title
        content
      }
    }
  }
`;
