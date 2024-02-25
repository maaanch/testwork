import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateClient($id: ID!,$name: String, $email: String, $phone: String) {
    updateClient(id: $id, name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export { ADD_USER, DELETE_USER, UPDATE_USER };
