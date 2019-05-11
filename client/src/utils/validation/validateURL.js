import Validator from 'validator';

export default urls => {
  let errors = {};
  urls.forEach(url => {
    if (
      !Validator.isURL(url.url, { require_protocol: true }) &&
      url.url !== ''
    ) {
      errors[url.name] = 'Invalid URL';
    }
  });
  return errors;
};
