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
    let status;
    fields.forEach(({ field, value }) => {
        if (typeof(value) !=='string') {
            status = false
        }
    });
    return status;
}

module.exports = {emptyFieldsValidate, isItString};
