const validate = ({ source, link, name, description, explanation }) => {
  let errors = {};
  if (!source) errors.source = 'Source is required';
  if (!link) {
    errors.link = 'URL is required';
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(link)) {
    errors.link = 'Invalid URL';
  }
  if (!name) errors.name = 'Name is required';
  if (!description) errors.description = 'Description is required';
  if (!explanation) errors.explanation = 'Explanation is required';
  return errors;
};

export default validate;
