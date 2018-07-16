import Router from "express-promise-router";
import { users_get_user_by_id, users_get_all } from "../controllers/user";
const router = Router();


router.route("/:userId").get(users_get_user_by_id);

router.route("/").get(users_get_all);


export default router;