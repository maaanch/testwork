import { gql } from "@apollo/client";

const GET_USERS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

const GET_USER = gql`
  query getClient($id: ID!) {
    client(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export { GET_USERS, GET_USER };
