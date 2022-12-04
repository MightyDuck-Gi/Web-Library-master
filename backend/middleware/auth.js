const jwt = require("jsonwebtoken");

/*//==================================================\\
    This will check if there is loging in user and verify it
*/
function auth(req, res, next) {
    try {
        const token = req.cookies.token;//this will stores cookies as token

        if(!token) {//otherwise if there is no cookie, then its unauthorised
          return res.status(401).json( { errorMessage: "Unauthorised" });
        }

    const verified = jwt.verify(token, "" + process.env.JWT_SECRET);

    req.user = verified.user;//once its verified it will send user as verified

    next();

    } catch (err) {//in try catch errror to prevent server crash
        console.error(err);
        res.status(401).json( { errorMessage: "Unauthorised" });
    };
}

module.exports = auth;