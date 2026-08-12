import { readFileSync, writeFileSync } from "fs";

const html = readFileSync("C:\\Users\\acmas\\.local\\share\\opencode\\tool-output\\tool_ff3ac80dd001EXh911qxks1eWk", "utf-8");

// Find all href links in the full HTML
const allLinks = [...html.matchAll(/href="(https?:\/\/[^\"]+)"/g)];
console.log("Total external links in full page:", allLinks.length);
allLinks.forEach(m => console.log(" ", m[1]));
