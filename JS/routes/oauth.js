const router = require("express-promise-router")();
const oAuthController = require("../controllers/oauth");
const passportConfig = require("../config/passport");

const { validateBody, schemas } = require("../helpers/routeHelpers");
const passport = require("passport");

router
  .route("/signUp")
  .post(validateBody(schemas.oauthSchema), oAuthController.signUp);

router
  .route("/signIn")
  .post(
    passport.authenticate("local", { session: false }),
    oAuthController.signIn
  );

router
  .route("/google")
  .post(
    passport.authenticate("google", { session: false }),
    oAuthController.googleOAuth
  );

router
  .route("/facebook")
  .post(
    passport.authenticate("facebook", { session: false }),
    oAuthController.facebbokOAuth
  );

router
  .route("/secret")
  .get(
    passport.authenticate("jwt", { session: false }),
    oAuthController.secret
  );

module.exports = router;
