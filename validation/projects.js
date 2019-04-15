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

module.exports = {
  createProject: createProjectValidator,
}