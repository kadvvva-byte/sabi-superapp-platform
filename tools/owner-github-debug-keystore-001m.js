const fs = require("fs");

const file = ".github/workflows/android-debug-apk.yml";
let content = fs.readFileSync(file, "utf8");

if (!content.includes("Generate Android debug keystore")) {
  content = content.replace(
`      - name: Build debug APK
`,
`      - name: Generate Android debug keystore
        run: |
          keytool -genkeypair -v \\
            -storetype JKS \\
            -keystore mobile/android/app/debug.keystore \\
            -storepass android \\
            -alias androiddebugkey \\
            -keypass android \\
            -keyalg RSA \\
            -keysize 2048 \\
            -validity 10000 \\
            -dname "CN=Android Debug,O=Android,C=US"
          test -f mobile/android/app/debug.keystore

      - name: Build debug APK
`
  );
}

fs.writeFileSync(file, content, "utf8");
fs.writeFileSync("tools/owner-github-debug-keystore-001m.js", fs.readFileSync(__filename, "utf8"), "utf8");

console.log("OWNER-GITHUB-DEBUG-KEYSTORE-001M APPLIED");
console.log("FIXED", file);
