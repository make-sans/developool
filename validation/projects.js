const Validator = require('validator');
const isEmpty = require('./is-empty');

function createProjectValidator(data) {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title mustn\'t be empty!';
  }

  if (data.skills && data.skills.length > 25) {
    errors.skills = 'You can only add up to 25 skills'
  }
  if (data.interests && data.interests.length > 25) {
    errors.interests = 'You can only add up to 25 interests'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

function updateProjectValidator(data) {
  const errors = {};

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

  if (data.skills && data.skills.length > 25) {
    errors.skills = 'You can only add up to 25 skills'
  }
  if (data.interests && data.interests.length > 25) {
    errors.interests = 'You can only add up to 25 interests'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

function filterProjectsValidator(data) {
  const errors = {};

  if (data.title !== undefined) {
    if (typeof data.title !== 'string') {
      errors.title = 'Title must be a string';
    }
  }

  if (data.public !== undefined) {
    if (typeof data.public !== 'boolean') {
      errors.public = 'Public must be a boolean';
    }
  }

  if (data.private !== undefined) {
    if (typeof data.public !== 'boolean') {
      errors.private = 'Private must be a boolean';
    }
  }

  if (data.skills !== undefined) {
    if (!Array.isArray(data.skills)) {
      errors.skills = 'Skills must be an array';
    }
  }

  if (data.interests !== undefined) {
    if (!Array.isArray(data.interests)) {
      errors.interests = 'Interests must be an array';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

module.exports = {
  createProject: createProjectValidator,
  updateProject: updateProjectValidator,
  filterProjects: filterProjectsValidator,
}