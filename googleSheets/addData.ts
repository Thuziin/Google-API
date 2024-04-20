import { google } from "googleapis"

export async function inserirInfoSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://googleapis.com/auth/spreadsheets"
    });

    const sheets = google.sheets({ version:'v4', auth });
    
    const spreadsheetId = "";

    const values = ["Nome", "Telefone", "Email", "Instagram", "Linkedin", "Status"];

    try {
        sheets.spreadsheets.values.append({
            spreadsheetId,
            valueInputOption: 'USER_ENTERED',
            range: "",
            requestBody: {
                values: [values]
            }
        });

        console.log("Dados inseridos com sucesso");
        return 0;
    } catch (error) {
        console.log("Error ", error);
        return null;
    }
}