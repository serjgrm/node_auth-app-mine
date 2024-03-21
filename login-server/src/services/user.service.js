import { ApiError } from "../exeptions/api.error.js";
import { User } from "../models/user.js";
import { v4 as uuidv4 } from 'uuid';
import { emailService } from "../services/email.service.js";

async function getAllActivated() {
  return User.findAll({
    where: {
      accessToken: null
    }
  });
}

function normalize({ id, email }) {
  return { id,  email }
}

function findByEmail(email) {
  return User.findOne({
    where: {
      email
    }
  })
}

async function register(email, password) {
  const accessToken = uuidv4();

  const existUser = await findByEmail(email);

  if (existUser) {
    throw ApiError.badRequest('User already exist', {
      email: "User already exist"
    });
  }

  await User.create({ email, password, accessToken });
  await emailService.sendActivationEmail(email, accessToken)
}

export const userService = {
  getAllActivated,
  normalize,
  findByEmail,
  register
}