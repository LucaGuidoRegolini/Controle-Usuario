import { Router } from "express";
import AdminController from "./AdminController";

export default function (router: Router) {
  router.post("/admin/", AdminController.create);
  router.post("/admin/login", AdminController.login);
}
