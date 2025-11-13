// src/validators/todoValidator.ts
import Joi from 'joi';

export const todoSchema = Joi.object({
  title: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title is required',
      'string.max': 'Title cannot exceed 100 characters',
    }),

  description: Joi.string()
    .allow('')
    .max(500)
    .messages({
      'string.max': 'Description cannot exceed 500 characters',
    }),

  category: Joi.string()
    .valid('General', 'Work', 'Personal', 'Shopping')
    .optional()
    .messages({
      'any.only': 'Invalid category',
    }),

  color: Joi.string()
    .pattern(/^#([0-9A-F]{3}){1,2}$/i)
    .optional()
    .messages({
      'string.pattern.base': 'Invalid color format (must be hex)',
    }),

  deadline: Joi.date()
    .optional()
    .messages({
      'date.base': 'Deadline must be a valid date',
    }),

  reminder: Joi.date()
    .optional()
    .custom((value, helpers) => {
      const { deadline } = helpers.state.ancestors[0];
      if (deadline && value > deadline) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .messages({
      'date.base': 'Reminder must be a valid date',
      'any.invalid': 'Reminder cannot be after deadline',
    }),
});
