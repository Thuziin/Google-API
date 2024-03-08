import { google } from "googleapis";

async function shareDrive() {
      const auth = new google.auth.GoogleAuth({
            keyFile: "../credentials.json",
            scopes: "https://www.googleapis.com/auth/drive",
      });

      const drive = google.drive({ version: "v3", auth});
      const permissionId = [];
      const folderId = "";

      const permissions = [
            {
                  type: "user",
                  role: "user",
                  emailAdress: "",
            },
      ]

      for (const permission of permissions) {
            try {
                  const result = await drive.permissions.create({
                        fileId: folderId,
                        sendNotificationEmail: true,
                        emailMessage: "Seja bem vindo a pasta ...",
                        requestBody: permission,
                        fields: "id"
                  });
                  console.log(`Email de permissão: ${result.data.emailAddress}`);
            } catch (error) {
                  console.error(error);
            }
      }
}

shareDrive();