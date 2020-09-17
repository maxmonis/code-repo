const validate = ({ source, url, name, description, code }) => {
  let errors = {};
  if (!source) errors.source = 'Source is required';
  if (!url) {
    errors.url = 'URL is required';
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(url)) {
    errors.url = 'Invalid URL';
  }
  if (!name) errors.name = 'Name is required';
  if (!description) errors.description = 'Description is required';
  if (!code) errors.code = 'Code is required';
  return errors;
};

export default validate;
