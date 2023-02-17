import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'Incorrect format').isEmail(),
    body('password', 'Password must be a minimum of 5 characters').isLength({ min: 5 }),
    body('fullName', 'Enter the name').isLength({ min: 3 }),
    body('avatarUrl', 'Incorrect URL of avatar').optional().isURL(),
];

export const loginValidation = [
    body('email', 'Incorrect format').isEmail(),
    body('password', 'Password must be a minimum of 5 characters').isLength({ min: 5 }),
];

export const postCreateValidation = [
    body('title', 'Insert the title of the article').isLength({ min: 3 }).isString(),
    body('text', 'Insert the text of the article').isLength({ min: 10 }).isString(),
    body('tags', 'Incorrect format of tags').optional().isArray(),
    body('imageUrl', 'Incorrect URL to the image').optional().isString(),
];
