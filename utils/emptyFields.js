const emptyFieldsValidate = (fields) => {
    const errors = [];
    fields.forEach(({ field, value }) => {
        if (!value) {
            errors.push({ field, message: `${field} is required` });
        }
    });
    return errors.length ? errors : true;
};

module.exports = emptyFieldsValidate;
