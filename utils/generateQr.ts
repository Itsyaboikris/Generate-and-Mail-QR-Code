import {IGenerateQrResult, IQrData} from "../Interfaces/qrInterface";
import path from "path";
import {homedir} from "os";

const htmlPDF = require("html-pdf");
const qrcode = require("qrcode");

export async function generateQrCode(data: IQrData) {

    try {

        let options = {format: "Letter"};

        const _url = `localhost:5000/static/mypdf.pdf`;
        const _path = path.join(homedir(), `/uploads/mypdf.pdf`);
        let result:IGenerateQrResult;

        const code = await qrcode.toDataURL(JSON.stringify(data));

        const html = `<h1>Your QR Code</h1> <img src="${code}"/>`;

        await htmlPDF.create(html, options).toFile(_path, (err: any, res: any) =>
            {
                if (err) {
                    console.log("Error Creating PDF."+ err);
                    return _url;
                }

            }
        );

        return result = {url:_url, path: _path};

    } catch (e) {
        console.log("error creating code:" + e);
        const data: IGenerateQrResult = {url: undefined, path: ""};
        return data;
    }
}
