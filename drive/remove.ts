import { google } from "googleapis";

async function removeFromDrive () {
      const auth = new google.auth.GoogleAuth({
            keyFile: "../credentials.json",
            scopes: "https://www.googleapis.com/auth/drive"
      });

      const drive = google.drive({ version: "v3", auth });

      const folderId = "";
      const email = "";

      const res = await drive.permissions.list({
            fileId: folderId,
            fields: "permissions(id, emailAddress)",
      });

      const permissions = res.data.permissions;
      if (permissions && permissions.length) {
            const userPermission = permissions.find((permission) => permission.emailAddress === email);

            if (userPermission && userPermission.id) {
                  await drive.permissions.delete({
                        fileId: folderId,
                        permissionId: userPermission.id
                  })

                  console.log(`${email}, não tem mais acesso a esse folder`);
            } else {
                  console.log(`Erro: não foi possível remover o email: ${email}`);
            }
      }
}

removeFromDrive();