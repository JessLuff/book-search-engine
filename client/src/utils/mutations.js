import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(description: String!, title: String!, bookId: ID!, image: String!, link: String!) {
    saveBook(description: $bookdescription,  title: $booktitle, bookId: bookId, image: bookimage, link: booklink) {
      _id
      bookdescription
      booktitle
      bookId
      bookimage
      booklink
    }
  }
`;
