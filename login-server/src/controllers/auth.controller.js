import { v4 as uuidv4 } from 'uuid';
import { User } from "../models/user.js";
import { emailService } from "../services/email.service.js";

const register = async (req, res) => {
  const { email, password } = req.body;

  const newUser = await User.create({ email, password });
  const token = uuidv4();
  await emailService.sendActivationEmail(email, token)

  res.send(newUser);
}

const getAllUsers = async (req, res) => {
  const users = await User.findAll();

  res.send(users);
}

export const authController = {
  register,
  getAllUsers
}