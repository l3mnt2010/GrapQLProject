const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    password: String!
    admin: Int!
  }

  type Course {
    id: Int!
    ten_khoa: String!
  }

  type Subject {
    id: Int!
    ten_mon: String!
    khoa_id: Int!
  }

  type Question {
    id: Int!
    noi_dung: String!
    mon_id: Int!
  }

  type Answer {
    id: Int!
    noi_dung: String!
    dung: Boolean!
    cau_hoi_id: Int!
  }

  type AuthPayload {
  token: String!
  refreshToken: String!
 }

 type RegisterResponse {
    message: String!
    statusCode: Int!
  }

  type Query {
    users: [User!]!
    userByUsername(username: String!): User
    courses: [Course!]!
    courseById(id: Int!): Course
    subjects: [Subject!]!
    subjectById(id: Int!): Subject
    questions: [Question!]!
    questionById(id: Int!): Question
    answersForQuestion(questionId: Int!): [Answer!]!
  }

  type Mutation {
    createUser(username: String!, password: String!, admin: Int!): User!
    updateUser(id: Int!, username: String!, password: String!, admin: Int!): User!
    deleteUser(id: Int!): Boolean!
    createCourse(ten_khoa: String!): Course!
    updateCourse(id: Int!, ten_khoa: String!): Course!
    deleteCourse(id: Int!): Boolean!
    createSubject(ten_mon: String!, khoa_id: Int!): Subject!
    updateSubject(id: Int!, ten_mon: String!, khoa_id: Int!): Subject!
    deleteSubject(id: Int!): Boolean!
    createQuestion(noi_dung: String!, mon_id: Int!): Question!
    updateQuestion(id: Int!, noi_dung: String!, mon_id: Int!): Question!
    deleteQuestion(id: Int!): Boolean!
    createAnswer(noi_dung: String!, dung: Boolean!, cau_hoi_id: Int!): Answer!
    updateAnswer(id: Int!, noi_dung: String!, dung: Boolean!, cau_hoi_id: Int!): Answer!
    deleteAnswer(id: Int!): Boolean!
    login(username: String!, password: String!): AuthPayload!
    register(username: String!, password: String!): RegisterResponse!
  }
`;

module.exports = typeDefs;