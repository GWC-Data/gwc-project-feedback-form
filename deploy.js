import path from "path";
import { fileURLToPath } from "url";
import ftp from "basic-ftp";
import fg from "fast-glob";
import cliProgress from "cli-progress";
import chalk from "chalk";
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const config = {
  host: "145.79.210.13",
  user: "u927690231.projectfeedbacks",
  password: "CNs#I@390zrz",
  secure: false,
};
 
const localDistPath = path.resolve(__dirname, "./dist");
const remoteBasePath = "/";
 
async function DevDeploy() {
  const client = new ftp.Client();
  client.ftp.verbose = false;
 
  console.log(chalk.cyanBright("\n🚀 Starting FTP Deployment Process...\n"));
 
  try {
    console.log(chalk.blue("🔌 Connecting to FTP server..."));
    await client.access(config);
 
    console.log(chalk.yellow("🧹 Removing existing files on remote server..."));
    await cleanRemoteDirectory(client, remoteBasePath);
 
    console.log(chalk.blue("🔍 Collecting local build files..."));
    const uploadEntries = await fg("**/*", {
      cwd: localDistPath,
      dot: true,
      onlyFiles: true,
    });
 
    const uploadBar = new cliProgress.SingleBar({
      format: `${chalk.magenta(
        "Uploading"
      )} [{bar}] {percentage}% | {value}/{total} files`,
      barCompleteChar: "█",
      barIncompleteChar: "░",
      hideCursor: true,
    });
 
    uploadBar.start(uploadEntries.length, 0);
    let uploaded = 0;
 
    for (const file of uploadEntries) {
      const localFilePath = path.join(localDistPath, file);
      const remoteFilePath = path.posix.join(remoteBasePath, file);
      const remoteDir = path.posix.dirname(remoteFilePath);
 
      await ensureDir(client, remoteDir);
      await client.uploadFrom(localFilePath, remoteFilePath);
 
      uploaded++;
      uploadBar.update(uploaded);
    }
 
    uploadBar.stop();
    console.log(chalk.greenBright("\n✅ Deployment completed successfully!\n"));
  } catch (err) {
    console.error(chalk.redBright(`\n❌ Deployment failed: ${err.message}\n`));
  } finally {
    client.close();
    console.log(chalk.blue("🔌 FTP connection closed.\n"));
  }
}
 
async function cleanRemoteDirectory(client, remoteDir) {
  try {
    const items = await client.list(remoteDir);
    for (const item of items) {
      const fullPath = path.posix.join(remoteDir, item.name);
      if (item.isDirectory) {
        await cleanRemoteDirectory(client, fullPath);
        await client.removeDir(fullPath);
      } else {
        await client.remove(fullPath);
      }
    }
  } catch (err) {
    console.warn(
      chalk.red(
        `⚠️  Failed to clean remote directory: ${remoteDir}\n${err.message}`
      )
    );
  }
}
 
async function ensureDir(client, dir) {
  const parts = dir.split("/").filter(Boolean);
  let current = "/";
  for (const part of parts) {
    current += part + "/";
    try {
      await client.cd(current);
    } catch {
      await client.send("MKD " + current);
    }
  }
}
 
DevDeploy();
 