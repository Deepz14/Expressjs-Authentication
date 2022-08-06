exports.handleError = (error, req, res, next) => {
    return res.status(error.status || 500).json({status: 'error', message: error.message});
}