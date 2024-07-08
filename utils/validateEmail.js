function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email !== undefined && email !== null && email.match(emailFormat)) { return true; }
    
    return false;
}

module.exports = isEmail