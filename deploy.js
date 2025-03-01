import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Path to the build folder (adjust this if your build folder is different)
const buildDir = path.resolve('build');

// Function to run shell commands
const runCommand = (command) => {
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
};

// Main deploy function
const deploy = () => {
    // Step 1: Checkout the publish branch
    console.log('Switching to the publish branch...');
    runCommand('git checkout publish');

    // Step 2: Pull the latest changes from the master (or main) branch
    console.log('Pulling the latest changes from master...');
    runCommand('git pull origin master'); // or `git pull origin main`

    // Step 3: Install dependencies (if any updates are pulled in from master)
    console.log('Running npm install to ensure dependencies are up to date...');
    runCommand('npm install');

    // Step 4: Build the app
    console.log('Building the app...');
    runCommand('npm run build');

    // Step 5: Check if the build directory exists
    if (!fs.existsSync(buildDir)) {
        console.error(`Build directory does not exist: ${buildDir}`);
        process.exit(1);
    }

    // Step 6: Clean up the publish branch (but leave .git, .gitignore, and the build folder)
    console.log('Cleaning up the publish branch...');
    const publishDir = process.cwd();

    // Delete everything except .git, .gitignore, and the build folder
    fs.readdirSync(publishDir).forEach((file) => {
        if (file !== '.git' && file !== '.gitignore' && file !== 'build') {
        const filePath = path.join(publishDir, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            fs.rmdirSync(filePath, { recursive: true });
        } else {
            fs.unlinkSync(filePath);
        }
        }
    });

    // Step 7: Move the contents of the build folder to the root of the publish branch
    console.log('Moving build files to the root...');
    fs.readdirSync(buildDir).forEach((file) => {
        const srcPath = path.join(buildDir, file);
        const destPath = path.join(publishDir, file);
        fs.renameSync(srcPath, destPath);
    });

    // Step 8: Delete the build folder
    console.log('Deleting the build folder...');
    fs.rmdirSync(buildDir, { recursive: true });

    // Step 9: Commit and push the changes to the publish branch
    console.log('Committing and pushing changes to the publish branch...');
    runCommand('git add .');
    runCommand('git commit -m "Deploy to GitHub Pages"');
    runCommand('git push origin publish');

    // Step 10: Switch back to the master branch
    console.log('Switching back to the master branch...');
    runCommand('git checkout master');

    // Step 11: Reinstall dependencies
    console.log('Running npm install to reinstall dependencies...');
    runCommand('npm install');

    console.log('Deployment complete!');
};

// Run the deployment
deploy();
