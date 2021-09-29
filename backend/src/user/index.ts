import { Router } from "express";
import UserController from "./UserController";
import authentication from "../middleware/authentication";

export default function (router: Router) {
  router.post("/user/login", UserController.login);
  router.get("/user/me", authentication.userAuthent, UserController.me);

  router.get("/users/:id", authentication.adminAuthent, UserController.index);
  router.get("/users/", authentication.adminAuthent, UserController.list);
  router.post("/users/", authentication.adminAuthent, UserController.create);
  router.put("/users/:id", authentication.adminAuthent, UserController.update);
  router.delete("/users/:id", authentication.adminAuthent, UserController.delete);
}
