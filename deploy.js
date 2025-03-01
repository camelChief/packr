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
    console.log('Switching to the publish branch...');
    runCommand('git checkout publish');

    console.log('Fetching the latest changes from origin...');
    runCommand('git fetch origin');

    console.log('Resetting the publish branch to master...');
    runCommand('git reset --hard origin/master');

    console.log('Running npm install to ensure dependencies are up to date...');
    runCommand('npm install');

    console.log('Building the app...');
    runCommand('npm run build');

    if (!fs.existsSync(buildDir)) {
        console.error(`Build directory does not exist: ${buildDir}`);
        process.exit(1);
    }

    console.log('Cleaning up the publish branch...');
    const publishDir = process.cwd();

    fs.readdirSync(publishDir).forEach((file) => {
        if (file !== '.git' && file !== '.gitignore' && file !== 'node_modules' && file !== 'build') {
        const filePath = path.join(publishDir, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            fs.rmdirSync(filePath, { recursive: true });
        } else {
            fs.unlinkSync(filePath);
        }
        }
    });

    console.log('Moving build files to the root...');
    fs.readdirSync(buildDir).forEach((file) => {
        const srcPath = path.join(buildDir, file);
        const destPath = path.join(publishDir, file);
        fs.renameSync(srcPath, destPath);
    });

    console.log('Deleting the build folder...');
    fs.rmdirSync(buildDir, { recursive: true });

    console.log('Committing and pushing changes to the publish branch...');
    runCommand('git add .');
    runCommand('git commit -m "Deploy to GitHub Pages"');
    runCommand('git push --force origin publish');

    console.log('Switching back to the master branch...');
    runCommand('git checkout master');

    console.log('Running npm install to reinstall dependencies...');
    runCommand('npm install');

    console.log('Deployment complete!');
};

// Run the deployment
deploy();
