import { PdfReader } from "pdfreader";

export async function extractText(buffer) {
  return new Promise((resolve, reject) => {
    let text = "";

    new PdfReader().parseBuffer(buffer, (err, item) => {
      if (err) {
        reject(err);
      }

      else if (!item) {
        resolve(text);
      }

      else if (item.text) {
        text += item.text + " ";
      }
    });
  });
}