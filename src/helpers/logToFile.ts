import fs from 'fs'

export default function logToFile(message: String) {
    const logMessage = `${new Date().toISOString()} - ${message}\n\n`;

    fs.appendFile('error.log', logMessage, (err) => {
        if (err) {
            console.error('Erro ao escrever no arquivo de log:', err);
        }
    });
}