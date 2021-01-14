import {Request, Response} from "express";
import {generateQrCode} from "../utils/generateQr";
import {IGenerateQrResult} from "../Interfaces/qrInterface";
import {sendEmailWithAttachments} from "../utils/emailer";

class QrCodeController {

    public async sendQrCode(req: Request, res: Response) {

        const {email, firstName, lastName} = req.body;

        let result: IGenerateQrResult = await generateQrCode({firstName: firstName, lastName: lastName});


        if (result.url) {

            await sendEmailWithAttachments({
                email:email,
                message: "Thanks for generating code",
                subject: "QR Code",
                filename: "mypdf.pdf",
                path: result.path
            });

            return res.status(200).json({
                message: "Code Sent",
                url: result.url
            });
        }

        return res.status(500).json({
            message: "Code Failed"
        });
    }

}

export const qrCodeController: QrCodeController = new QrCodeController();
