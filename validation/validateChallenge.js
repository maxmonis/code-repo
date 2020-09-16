const validate = ({ name, source, url, description }) => {
  let errors = {};
  if (!name) errors.name = 'Name is required';
  if (!source) errors.source = 'Source is required';
  if (!url) {
    errors.url = 'URL is required';
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(url)) {
    errors.url = 'Invalid URL';
  }
  if (!description) errors.description = 'Description is required';
  return errors;
};

export default validate;
