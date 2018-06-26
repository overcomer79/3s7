const express = require("express");
const router = require("express-promise-router")();
const oAuthController = require("../controllers/oauth");
const passportConfig = require("../config/passport");

const { validateBody, schemas } = require("../helpers/routeHelpers");
const passport = require("passport");

/*
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

// callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send("You reached the callback URI");
});

router.post("/signup", oAuthController.signUp);
router.post("/signin", oAuthController.signIn);
router.get('/secret', oAuthController.secret);
*/

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
  .route("/secret")
  .get(
    passport.authenticate("jwt", { session: false }),
    oAuthController.secret
  );

module.exports = router;
