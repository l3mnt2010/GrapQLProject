const { gql } = require('apollo-server-express');
const JWTHelper = require('./../helpers/JWTHelper');
const db = require('./../database');

const typeDefs = gql`
  type Mutation {
    login(username: String!, password: String!): AuthPayload
    register(username: String!, password: String!): RegisterResponse
    refreshToken: RefreshTokenResponse
    logout: LogoutResponse
  }

  type User {
    id: ID!
    username: String!
  }

  type AuthPayload {
    userInformation: User!
    token: String!
    refreshToken: String!
  }
  
  type LogoutResponse { 
    success: Boolean!
    message: String!
  }
  
  type RefreshTokenResponse {
    token: String!
  }

  type RegisterResponse {
    message: String!
    statusCode: Int!
  }
`;

const resolvers = {
  Query: {
    // me: async (_, __, { user }) => {
    //   if (!user) throw new Error('Not authenticated');
    //   return db.users.findByPk(user.id);
    // },
  },
  Mutation: {
    login: async (_, { username, password }, { req, res }) => {
      try {
        const user = await db.users.findOne({ where: { username } });
  
        if (!user) throw new Error('User not found');
        if (user.password !== password) throw new Error('Invalid password');
  
        const token = JWTHelper.signToken({ id: user.id, username, admin: user.admin });
        const refreshToken = JWTHelper.signRefreshToken({ id: user.id, username, admin: user.admin });
  
        await db.users.update(
          { token, refreshToken },
          { where: { id: user.id } }
        );

        res.cookie('accessToken', token, { 
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict"
        });

        res.cookie('refreshToken', refreshToken, { 
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict"
        });
  
        const userInformation = {
          id: user.id,
          username: user.username,
          admin: user.admin
        };
  
        return {
          userInformation,
          token,
          refreshToken,
        };
      } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
      }
    },
  
    register: async (_, { username, password }) => {
      try {
        const existingUser = await db.users.findOne({ where: { username } });
        if (existingUser) throw new Error('Username already taken');
        
        await db.users.create({ username, password });
        return { message: 'User registered successfully', statusCode: 201 };
      } catch (error) {
        throw new Error(`Registration failed: ${error.message}`);
      }
    },

    refreshToken: async (_, __, {req, res}) => {
      
      try {
        if(!req.user || !req.user.username || !req.user.id) return "nope";
        const refreshToken = req.user;
        if (!refreshToken) return res.status(401).json("you are not authenticate");

        const payload = JWTHelper.verifyRefreshToken(refreshToken);
        
        const user = await db.users.findOne({ where: { id: payload.id, username: payload.username } });
    
        if (!user) throw new Error('User not found');
        
        const token = JWTHelper.signToken({ id: user.id, username: user.username });
        const newRefreshToken = JWTHelper.signRefreshToken({ id: user.id, username: user.username });
        
        await db.users.update(
          { refreshToken: newRefreshToken },
          { where: { id: user.id } }
        );
    
        res.cookie('refreshToken', refreshToken, { 
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict"
        });
    
        return { token };
      } catch (error) {
        throw new Error('Invalid refresh token');
      }
    },

    logout: async (_, __, { req, res }) => {
      try {
        if(!req.user || !req.user.username || !req.user.id) return "nope";

        const user = await db.users.findOne({ where: {id: req.user.id } });

        if (!user) throw new ApolloError('User not found', 'USER_NOT_FOUND');
        
        await db.users.update(
          { token: null, refreshToken: null },
          { where: { id: user.id } }
        );

        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
        return {
          success: true,
          message: 'Successfully logged out',
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed logged out',
        };
      }
    },
    
  },
};

module.exports = { typeDefs, resolvers };
