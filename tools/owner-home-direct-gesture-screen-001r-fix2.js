const fs = require("fs");

const file = "mobile/app/home.tsx";
let content = fs.readFileSync(file, "utf8");

content = content.replace(
`import React, {
  useCallback,
  useEffect,
} from "react";`,
`import React, {
  useCallback,
  useEffect,
  useState,
} from "react";`
);

fs.writeFileSync(file, content, "utf8");

console.log("OWNER-HOME-DIRECT-GESTURESCREEN-001R-FIX2 APPLIED");
console.log("FIXED", file);
