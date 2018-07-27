import Router from "express-promise-router";
import { users_get_user_by_id, users_get_all } from "../controllers/user";
import * as passport from "passport";
const router = Router();

router.route("/:userId").get(
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    // TODO: check on the roles
    //if (req.user.local.email === "prova@email.com") {
        next();
    //} else return res.status(403).send({ error: "Not enough privileges" });
  },
  users_get_user_by_id
);

router.route("/").get(users_get_all);

export default router;
