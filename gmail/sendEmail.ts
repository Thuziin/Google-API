import { google } from "googleapis";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } from "./credentials.json"

import nodemailer from "nodemailer"

export default async function sendEmail() {
    const oAuth2Client = new google.auth.OAuth2({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        redirectUri: REDIRECT_URI
    });

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    try {
        const { token } = await oAuth2Client.getAccessToken();;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth : {
                type: "OAuth2",
                user: "",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: token as string
            }
        });

        const mailOptions  = {
            from: "",
            to: "",
            subject: "Testando o uso da API"
        }

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) console.log(error);
            else console.log("Email sent: "+ info.response);
        });
    } catch (error) {
        console.log("Error: " , error);
        return null;
    }
}