import {Router} from "express";
import {qrCodeController} from "../controller/qrCodeController";

export const qrCodeRouter: Router = Router();

qrCodeRouter.post("/", qrCodeController.sendQrCode);
