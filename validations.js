import { body } from "express-validator";

export const registerValidation = [
  body("email", "Bad email format").isEmail(),
  body("password", "Password must consist more than 5 symbols").isLength({
    min: 5,
  }),
  body("fullName", "Name must consist more than 3 symbols").isLength({
    min: 3,
  }),
  body("avatarUrl", " Bad link format to avatar").optional().isURL(),
];

export const loginValidation = [
  body("email", "Bad email format").isEmail(),
  body("password", "Password must consist more than 5 symbols").isLength({
    min: 5,
  }),
];

export const postCreateValidation = [
  body("title", "enter the title of the article")
    .isLength({ min: 3 })
    .isString(),
  body("text", "enter the title of the article")
    .isLength({ min: 10 })
    .isString(),
  body("tags", "Wrong tags format").optional().isString(),
  body("imageUrl", " Bad link format to image").optional().isURL(),
];
