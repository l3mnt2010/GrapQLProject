const limitMiddleware = (req, res, next) => {
    const contentLength = req.get('Content-Length');
    const maxQueryLength = 2000;

    if (contentLength && parseInt(contentLength, 10) > maxQueryLength) {
        return res.status(413).json({ error: 'Request Entity Too Large' });
    }
    const requestBody = req.body;
    if (requestBody && requestBody.query) {
        const aliasCount = (requestBody.query.match(/__typename/g) || []).length;
        const maxAliasCount = 5;
        if (aliasCount > maxAliasCount) {
            return res.status(400).json({ error: 'Number of aliases exceeded the limit.' });
        }
    }
    next();
};

const validateRequestMiddleware = (req, res, next) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    const contentType = req.get('Content-Type');
    if (contentType !== 'application/json') {
        return res.status(415).json({ error: 'Unsupported Media Type' });
    }
    next();
};

module.exports = {
    limitMiddleware,
    validateRequestMiddleware
};
