const ftp = require("basic-ftp");
const path = require("path");
const fs = require("fs/promises");

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true; // Enable logging

    try {
        // Connect to FTP server
        await client.access({
            host: "162.250.126.211",
            user: "peeky_user",
            password: "MrC3KA1995",
            secure: false, // Set to true if your server supports FTPS
        });

        // Navigate to the deployment directory
        await client.ensureDir("/");

        // Remove existing files (optional, be careful with this)
        await client.clearWorkingDir();

        // Upload files from the `.next` build directory
        const buildPath = path.join(__dirname, "out");
        await uploadDirectory(client, buildPath);

        console.log("Deployment completed!");
    } catch (err) {
        console.error("Error during deployment:", err);
    } finally {
        client.close();
    }
}

async function uploadDirectory(client, dir) {
    const files = await fs.readdir(dir, { withFileTypes: true });
    for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
            await client.ensureDir(file.name);
            await client.cd(file.name);
            await uploadDirectory(client, fullPath);
            await client.cdup();
        } else {
            await client.uploadFrom(fullPath, file.name);
        }
    }
}

deploy();
