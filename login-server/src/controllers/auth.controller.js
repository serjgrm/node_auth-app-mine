import { User } from "../models/user.js";
import { userService } from '../services/user.service.js';
import { jwtService } from '../services/jwt.service.js';
import { ApiError } from "../exeptions/api.error.js";

function validateEmail(value) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }
}

function validatePassword(value) {
  if (!value) {
    return 'Password is required';
  }
    
  if (value.length < 6) {
    return 'At least 6 characters';
  }
};


const register = async (req, res, next) => {
  const { email, password } = req.body;
  
  const errors = {
    email: validateEmail(email),
    password: validatePassword(password)
  }

  if (errors.email || errors.password) {
    throw ApiError.badRequest('Bad request', errors)
  }

  await userService.register(email, password)
  res.send({message: 'OK'});
}

const activate = async (req, res) => {
  const { accessToken } = req.params;

  const user = await User.findOne({ where: { accessToken }});

  if (!user) {
    res.sendStatus(404);
    return
  }

  user.accessToken = null;
  user.save();

  res.send(user);
}

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.findByEmail(email);

  if (!user || user.password !== password) {
    res.send(401);

    return
  }

  const normalizedUsed = userService.normalize(user);
  const accesToken = jwtService.sign(normalizedUsed);

  res.send({
    user: normalizedUsed,
    accesToken
  })
};

export const authController = {
  register,
  activate,
  login
}