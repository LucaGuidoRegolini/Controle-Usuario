import { Router } from "express";
import AdminController from "./AdminController";
import authentication from "../middleware/authentication";

export default function (router: Router) {
  router.get("/admin/me", authentication.adminAuthent, AdminController.me);
  router.post("/admin/", AdminController.create);
  router.post("/admin/login", AdminController.login);
  router.delete("/admin/me", authentication.adminAuthent, AdminController.delete);
}
