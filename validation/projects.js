const Validator = require('validator');
const isEmpty = require('./is-empty');

function createProjectValidator(data) {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title mustn\'t be empty!';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

function updateProjectValidator(data) {
  let errors = {};

  if (!data.title) {
    if (Validator.isEmpty(data.title)) {
      errors.title = 'Title is required';
    }
  }

  data.title = !isEmpty(data.title) ? data.title : '';

  if (!Validator.isLength(data.title, { min: 2, max: 40 })) {
    errors.title = 'Title needs to be between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required';
  }

  if (typeof data.private !== 'undefined' && typeof data.private !== 'boolean')
    errors.private = 'Private or public must be a boolean';

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

module.exports = {
  createProject: createProjectValidator,
  updateProject: updateProjectValidator,
}