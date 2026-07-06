const fs = require("fs");

const files = [
  "mobile/app/qr/index.tsx",
  "mobile/src/modules/home/panels/HomePanel.tsx",
];

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");

  // Fix literal backslash-n that was inserted by the patch script.
  content = content.replace(/;\\nimport /g, ";\nimport ");
  content = content.replace(/;\\n  const /g, ";\n  const ");

  fs.writeFileSync(file, content, "utf8");
  console.log("FIXED", file);
}
