import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { userRepository } from '../repositories/index.js';

async function getUsers(req, res) {
  try {
    const { limit, page } = req.query;
    const users = await userRepository.getUsers(limit, page);
    res.status(HttpStatusCode.OK).json(users);
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

async function getUserById(req, res) {
  try {
    const userId = req.params.userId;
    const user = await userRepository.getUserById(userId);
    res.status(HttpStatusCode.OK).json(user);
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.userId;
    const deleteUser = await userRepository.deleteUser(userId);
    res.status(HttpStatusCode.OK).json(deleteUser);
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: errors.array(),
    });
  }
  try {
    const { email, password } = req.body;
    const existingUser = await userRepository.login({ email, password });
    res.status(HttpStatusCode.OK).json(existingUser);
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
};
const register = async (req, res) => {
  const { name, email, password, roleId } = req.body;

  try {
    debugger;
    const user = await userRepository.register({
      name,
      email,
      password,
      roleId,
    });
    res.status(HttpStatusCode.INSERT_OK).json(user);
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
};

const updateUser = async (req, res) => {
  try {
    const { file } = req;
    const { userId, name, email, roleId, phoneNumber } = req.body;
    const updateUser = await userRepository.updateUser({
      userId,
      name,
      email,
      phoneNumber,
      roleId,
      image: file,
    });
    res.status(HttpStatusCode.OK).json(updateUser);
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
};

const changePassword = async (req, res) => { 
  try {
    const { userId, password, newPassword  } = req.body;
    const changePassword = await userRepository.changePassword({
      userId,
      password,
      newPassword,
    });
    res.status(HttpStatusCode.OK).json(changePassword);
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

export default {
  getUsers,
  changePassword,
  getUserById,
  deleteUser,
  login,
  register,
  updateUser,
};
