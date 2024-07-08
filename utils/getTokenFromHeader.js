const getTokenFromHeader = (authHeader) => {
    if (!authHeader) return null;

    const parts = authHeader.split(' ');

    if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
        return parts[1];
    }

    if (parts.length === 1) {
        return parts[0];
    }

    return null;
};

module.exports = getTokenFromHeader