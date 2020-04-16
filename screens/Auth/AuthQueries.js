import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const COMFIRM_SECRET = gql`
  mutation confirmSecret($secret: String!, $email: String!){
    confirmSecret(secret: $secret, email: $email)
  }
`;