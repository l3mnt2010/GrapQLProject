
const bcrypt = require('bcryptjs');
const db = require('../database')
const JWTHelper = require('../helpers/JWTHelper');

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await db.getAllUsers();
        return users;
      } catch (error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
      }
    },
    userByUsername: async (_, { username }) => {
      try {
        const user = await db.getUserByUsername(username);
        if (!user) {
          throw new Error(`User with username '${username}' not found`);
        }
        return user;
      } catch (error) {
        throw new Error(`Failed to fetch user: ${error.message}`);
      }
    },
    courses: async () => {
      try {
        const courses = await db.getAllCourses();
        return courses;
      } catch (error) {
        throw new Error(`Failed to fetch courses: ${error.message}`);
      }
    },
    courseById: async (_, { id }) => {
      try {
        const course = await db.getCourseById(id);
        if (!course) {
          throw new Error(`Course with ID ${id} not found`);
        }
        return course;
      } catch (error) {
        throw new Error(`Failed to fetch course: ${error.message}`);
      }
    },
    subjects: async () => {
      try {
        const subjects = await db.getAllSubjects();
        return subjects;
      } catch (error) {
        throw new Error(`Failed to fetch subjects: ${error.message}`);
      }
    },
    subjectById: async (_, { id }) => {
      try {
        const subject = await db.getSubjectById(id);
        if (!subject) {
          throw new Error(`Subject with ID ${id} not found`);
        }
        return subject;
      } catch (error) {
        throw new Error(`Failed to fetch subject: ${error.message}`);
      }
    },
    questions: async () => {
      try {
        const questions = await db.getAllQuestions();
        return questions;
      } catch (error) {
        throw new Error(`Failed to fetch questions: ${error.message}`);
      }
    },
    questionById: async (_, { id }) => {
      try {
        const question = await db.getQuestionById(id);
        if (!question) {
          throw new Error(`Question with ID ${id} not found`);
        }
        return question;
      } catch (error) {
        throw new Error(`Failed to fetch question: ${error.message}`);
      }
    },
    answersForQuestion: async (_, { questionId }) => {
      try {
        const answers = await db.getAnswersForQuestion(questionId);
        return answers;
      } catch (error) {
        throw new Error(`Failed to fetch answers: ${error.message}`);
      }
    },
  },
  Mutation: {
    
    login: async (_, { username, password }, { db }) => {
      const user = await db.getUserByUsername(username);

      if (!user) {
        throw new Error('User not found');
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new Error('Invalid password');
      }

      // Generate tokens
      const token = JWTHelper.signToken({username: username, id: user.id});
      const refreshToken = JWTHelper.signRefreshToken({username: username, id: user.id});

      return {
        token,
        refreshToken
      };
    },

    register: async (_, { username, password }) => {
      try {
        const existingUser = await db.getUserByUsername(username);
        if (existingUser) {
          throw new Error('Username is already taken');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.createUser( username, hashedPassword );

        return { message: 'Register successfully', statusCode: 201 };
      } catch (error) {
        throw new Error(`Failed to register user: ${error.message}`);
      }
    },

    createUser: async (_, { username, password }) => {
      try {
        const newUser = await db.createUser(username, password);
        return newUser;
      } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
    },
    updateUser: async (_, { id, username, password, admin }) => {
      try {
        const updatedUser = await db.updateUser(id, username, password, admin);
        if (!updatedUser) {
          throw new Error(`User with ID ${id} not found`);
        }
        return updatedUser;
      } catch (error) {
        throw new Error(`Failed to update user: ${error.message}`);
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const deleted = await db.deleteUser(id);
        if (!deleted) {
          throw new Error(`User with ID ${id} not found`);
        }
        return true;
      } catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
      }
    },
    createCourse: async (_, { ten_khoa }) => {
      try {
        const newCourse = await db.createCourse(ten_khoa);
        return newCourse;
      } catch (error) {
        throw new Error(`Failed to create course: ${error.message}`);
      }
    },
    updateCourse: async (_, { id, ten_khoa }) => {
      try {
        const updatedCourse = await db.updateCourse(id, ten_khoa);
        if (!updatedCourse) {
          throw new Error(`Course with ID ${id} not found`);
        }
        return updatedCourse;
      } catch (error) {
        throw new Error(`Failed to update course: ${error.message}`);
      }
    },
    deleteCourse: async (_, { id }) => {
      try {
        const deleted = await db.deleteCourse(id);
        if (!deleted) {
          throw new Error(`Course with ID ${id} not found`);
        }
        return true;
      } catch (error) {
        throw new Error(`Failed to delete course: ${error.message}`);
      }
    },
    createSubject: async (_, { ten_mon, khoa_id }) => {
      try {
        const newSubject = await db.createSubject(ten_mon, khoa_id);
        return newSubject;
      } catch (error) {
        throw new Error(`Failed to create subject: ${error.message}`);
      }
    },
    updateSubject: async (_, { id, ten_mon, khoa_id }) => {
      try {
        const updatedSubject = await db.updateSubject(id, ten_mon, khoa_id);
        if (!updatedSubject) {
          throw new Error(`Subject with ID ${id} not found`);
        }
        return updatedSubject;
      } catch (error) {
        throw new Error(`Failed to update subject: ${error.message}`);
      }
    },
    deleteSubject: async (_, { id }) => {
      try {
        const deleted = await db.deleteSubject(id);
        if (!deleted) {
          throw new Error(`Subject with ID ${id} not found`);
        }
        return true;
      } catch (error) {
        throw new Error(`Failed to delete subject: ${error.message}`);
      }
    },
    createQuestion: async (_, { noi_dung, mon_id }) => {
      try {
        const newQuestion = await db.createQuestion(noi_dung, mon_id);
        return newQuestion;
      } catch (error) {
        throw new Error(`Failed to create question: ${error.message}`);
      }
    },
    updateQuestion: async (_, { id, noi_dung, mon_id }) => {
      try {
        const updatedQuestion = await db.updateQuestion(id, noi_dung, mon_id);
        if (!updatedQuestion) {
          throw new Error(`Question with ID ${id} not found`);
        }
        return updatedQuestion;
      } catch (error) {
        throw new Error(`Failed to update question: ${error.message}`);
      }
    },
    deleteQuestion: async (_, { id }) => {
      try {
        const deleted = await db.deleteQuestion(id);
        if (!deleted) {
          throw new Error(`Question with ID ${id} not found`);
        }
        return true;
      } catch (error) {
        throw new Error(`Failed to delete question: ${error.message}`);
      }
    },
    createAnswer: async (_, { noi_dung, dung, cau_hoi_id }) => {
      try {
        const newAnswer = await db.createAnswer(noi_dung, dung, cau_hoi_id);
        return newAnswer;
      } catch (error) {
        throw new Error(`Failed to create answer: ${error.message}`);
      }
    },
    updateAnswer: async (_, { id, noi_dung, dung, cau_hoi_id }) => {
      try {
        const updatedAnswer = await db.updateAnswer(id, noi_dung, dung, cau_hoi_id);
        if (!updatedAnswer) {
          throw new Error(`Answer with ID ${id} not found`);
        }
        return updatedAnswer;
      } catch (error) {
        throw new Error(`Failed to update answer: ${error.message}`);
      }
    },
    deleteAnswer: async (_, { id }) => {
      try {
        const deleted = await db.deleteAnswer(id);
        if (!deleted) {
          throw new Error(`Answer with ID ${id} not found`);
        }
        return true;
      } catch (error) {
        throw new Error(`Failed to delete answer: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
