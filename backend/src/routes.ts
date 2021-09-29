import { Router } from "express";

import admin from "./admin";
import user from "./user";

const router = Router();

admin(router);
user(router);

export default router;
