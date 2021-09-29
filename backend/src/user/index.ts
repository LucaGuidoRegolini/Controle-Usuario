import { Router } from "express";
import UserController from "./UserController";

export default function (router: Router) {
  router.post("/users/", UserController.create);
}
