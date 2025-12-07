# Prerequisites: Install Node.js and npm
You must have Node.js and npm installed globally on your system using your operating system's terminal/package manager (NodeSource instructions).
Linux (Ubuntu/Debian Example)
bash
# Add NodeSource repository
`curl -fsSL deb.nodesource.com | sudo -E bash -`

# Install Node.js and npm
`sudo apt-get install -y nodejs`

Verification
Confirm the installation by checking the versions:

`node -v`

`npm -v`


# Step-by-Step Setup
Follow these commands within your project directory:
## 1. Install Project Dependencies
Run this command inside your project directory to download all required packages listed in package.json.

`
npm install
`

## 2. Run the Development Server
Execute the predefined "dev" script in your package.json to start the application in development mode.

`
npm run dev
`

# Common Commands
npm install: Installs all project dependencies.
npm run dev: Starts the application in development mode.
npm run build: Compiles source files into production-ready JavaScript code.



