// replace.js
//upload your key as UNSPLASH_KEY as env varible in host
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'script.js');
let scriptContent = fs.readFileSync(filePath, 'utf8');

// The environment variable MUST be named UNSPLASH_KEY in Vercel settings
const accessKey = process.env.UNSPLASH_KEY; 

// The placeholder in script.js is __UNSPLASH_ACCESS_KEY__
const placeholder = '__UNSPLASH_ACCESS_KEY__';

if (accessKey) {
    // 1. Check if the placeholder exists
    if (scriptContent.includes(placeholder)) {
        // 2. Perform the replacement
        scriptContent = scriptContent.replace(placeholder, accessKey);

        // 3. Write the modified content back to script.js
        fs.writeFileSync(filePath, scriptContent, 'utf8');
        console.log('✅ Successfully injected UNSPLASH_KEY into script.js');
    } else {
        console.warn('⚠️ Placeholder not found. Check if the placeholder is still present in script.js');
    }
} else {
    console.error('❌ UNSPLASH_KEY environment variable is missing!');
    process.exit(1); // Fail the build if the key is not set
}
