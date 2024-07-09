const emptyFieldsValidate = (fields) => {
    const errors = [];
    fields.forEach(({ field, value }) => {
        if (!value || value === null || value === undefined || value === '') {
            errors.push({ field, message: `${field} is required` });
        }
    });
    return errors.length ? errors : true;
};

const isItString = (fields) => {
    let status = true;
    const errors = [];
    
    fields.forEach(({ field, value }) => {
      if (typeof(value) !== 'string') {
        console.log(typeof(value));
        errors.push({ field, message: `${field} must be a string` });
        status = false;
      }
    });
  
    if (status === false) {
      console.log(errors);
    }
  
    return { status, errors };
  };
  

module.exports = {emptyFieldsValidate, isItString};
