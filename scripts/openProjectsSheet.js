import dotenv from "dotenv";
import { exec } from "child_process";

dotenv.config();

const SHEET_ID =
  process.env.VITE_GOOGLE_SHEET_ID || process.env.GOOGLE_SHEET_ID || "";

if (!SHEET_ID) {
  console.error("❌ VITE_GOOGLE_SHEET_ID is not set in .env");
  process.exit(1);
}

const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`;

const openCommand =
  process.platform === "win32"
    ? `start "" "${url}"`
    : process.platform === "darwin"
      ? `open "${url}"`
      : `xdg-open "${url}"`;

exec(
  openCommand,
  { shell: process.platform === "win32" ? "cmd.exe" : undefined },
  (error) => {
    if (error) {
      console.error("❌ Failed to open spreadsheet:", error.message);
      process.exit(1);
    }
    console.log(`✅ Opened: ${url}`);
  }
);
