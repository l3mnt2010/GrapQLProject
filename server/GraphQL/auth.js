const { gql } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const JWTHelper = require('./../helpers/JWTHelper');
const db = require('./../database');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload
    register(username: String!, password: String!): RegisterResponse
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

  type RegisterResponse {
    message: String!
    statusCode: Int!
  }
`;

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return db.users.findByPk(user.id);
    },
  },
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await db.users.findOne({ where: { username } });
    
      if (!user) throw new Error('User not found');
    
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw new Error('Invalid password');
    
      const token = JWTHelper.signToken({ id: user.id, username });
      
      const refreshToken = JWTHelper.signRefreshToken({ id: user.id, username });
      
      await db.users.update(
        { token, refreshToken },
        { where: { id: user.id } }
      );

      const userInformation = {
        id: user.id,
        username: user.username,
      };

      return {
        userInformation,
        token,
        refreshToken,
      };
    },
    

    register: async (_, { username, password }) => {
      const existingUser = await db.users.findOne({ where: { username } });
      if (existingUser) throw new Error('Username already taken');

      const hashedPassword = await bcrypt.hash(password, 10);
      await db.users.create({ username, password: hashedPassword });

      return { message: 'User registered successfully', statusCode: 201 };
    },

    // refreshToken: async (_, { refreshToken }) => {
    //   // Xác thực refreshToken
    //   try {
    //     const payload = JWTHelper.verifyRefreshToken(refreshToken);
        
    //     // Tìm người dùng dựa trên payload của refreshToken
    //     const user = await db.users.findOne({ where: { id: payload.id, username: payload.username } });
    
    //     if (!user) throw new Error('User not found');
        
    //     // Tạo một token mới
    //     const token = JWTHelper.signToken({ id: user.id, username: user.username });
        
    //     // Tạo một refreshToken mới
    //     const newRefreshToken = JWTHelper.signRefreshToken({ id: user.id, username: user.username });
        
    //     // Cập nhật cơ sở dữ liệu với refreshToken mới
    //     await db.users.update(
    //       { refreshToken: newRefreshToken },
    //       { where: { id: user.id } }
    //     );
    
    //     // Trả về người dùng và token mới
    //     const userWithoutPassword = {
    //       ...user.toJSON(),
    //       password: undefined,
    //     };
    
    //     return {
    //       user: userWithoutPassword,
    //       token,
    //       refreshToken: newRefreshToken,
    //     };
    //   } catch (error) {
    //     throw new Error('Invalid refresh token');
    //   }
    // },

    //     logout: async (_, { token }) => {
    //   try {
    //     // Tìm người dùng dựa trên token
    //     const user = await db.users.findOne({ where: { token } });

    //     if (!user) throw new ApolloError('User not found', 'USER_NOT_FOUND');
        
    //     // Xóa hoặc vô hiệu hóa token
    //     await db.users.update(
    //       { token: null, refreshToken: null }, // Hoặc { token: '', refreshToken: '' }
    //       { where: { id: user.id } }
    //     );

    //     return {
    //       success: true,
    //       message: 'Successfully logged out',
    //     };
    //   } catch (error) {
    //     throw new ApolloError('Logout failed', 'LOGOUT_FAILED');
    //   }
    // },
    
  },
};

module.exports = { typeDefs, resolvers };
