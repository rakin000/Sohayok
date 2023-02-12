const router = require('express').Router()
// const { isValidApplicantJWTToken, optionalValidApplicantJWTToken } = require('../../middlewares/auth');
const applicantAuth = require('./auth')
const applicantProfile = require('./profile');
const applicantEducation = require("./education");
const circularRoute = require('./circular');
const postRoute = require('./post');
const applicationRoute = require('./application');

router.use('/auth', applicantAuth)

// as some routes in circular and posts need no auth access
// so am changing them to here

router.use(optionalValidApplicantJWTToken);
router.use('/circular', circularRoute);
router.use('/posts', postRoute);

router.use(isValidApplicantJWTToken);
router.use('/profile', applicantProfile);
router.use('/edu', applicantEducation);

router.use('/application', applicationRoute);

module.exports = router