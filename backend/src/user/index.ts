import { Router } from "express";
import UserController from "./UserController";
import authAdmin from "../middleware/authAdmin";

export default function (router: Router) {
  router.get("/users/:id", authAdmin.jwtAuthent, UserController.index);
  router.get("/users/", authAdmin.jwtAuthent, UserController.list);
  router.post("/users/", authAdmin.jwtAuthent, UserController.create);
  router.put("/users/:id", authAdmin.jwtAuthent, UserController.update);
  router.delete("/users/:id", authAdmin.jwtAuthent, UserController.delete);
}
