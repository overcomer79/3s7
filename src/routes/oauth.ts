import Router from "express-promise-router";
import * as passport from "passport";
import { signIn, signUp } from "../controllers/oauth";
import { validateBody, schemas } from "../helpers/routeHelpers";

/**
 * This is needed to import the passoport strategy
 */
const passportConfig = require("../config/passport");

const router = Router();

router.route("/signUp").post(validateBody(schemas.oauthSchema), signUp);

router
  .route("/signIn")
  .post(passport.authenticate("local", { session: false }), signIn);
  
/*
router
  .route("/google")
  .post(
    //passport.authenticate("google", { session: false }),
    //oAuthController.googleOAuth
  );

router
  .route("/facebook")
  .post(
    //passport.authenticate("facebook", { session: false }),
    //oAuthController.facebbokOAuth
  );

router
  .route("/secret")
  .get(
    //passport.authenticate("jwt", { session: false }),
    //oAuthController.secret
  );
  */

export default router;
