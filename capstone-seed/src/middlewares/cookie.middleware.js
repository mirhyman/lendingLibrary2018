// This middleware checks existence of playbuzz cookie
module.exports = (req, res, next) => {
  if(!req.cookies || !req.cookies.playbuzz) {
    res.serverError(400, 'Must have a valid playbuzz cookie');
  } else {
    next();
  }
};