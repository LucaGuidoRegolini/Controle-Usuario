import { Router } from "express";
import UserController from "./UserController";
import authAdmin from "../middleware/authAdmin";

export default function (router: Router) {
  router.post("/users/", authAdmin.jwtAuthent, UserController.create);
  router.get("/users/:id", authAdmin.jwtAuthent, UserController.index);
}
