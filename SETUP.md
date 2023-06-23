# Prerequisites

In order to start working on this quest you need the following: 

## Node.js

[Node.js](https://nodejs.org/en/) is a JavaScript runtime to execute JavaScript code in the terminal.  Check that you have at least version 16.15.1 by run the command:

```bash
node -v
```

Refer to the official [documentation](https://nodejs.org/en/download) if  Node.js is not installed or you have an older version.

## Git
[Git](https://git-scm.com/) is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. Run the following command to check if Git is already installed:

```bash
git --version
```

Refer to the official [documentation](https://git-scm.com/downloads) if  Git is not installed. 

## GitHub CLI

CLI is the acronym of [Command-line Interface](https://en.wikipedia.org/wiki/Command-line_interface). We will use [GitHub CLI](https://cli.github.com/) to interact with GitHub directly from the terminal.

Check if it is already be installed and configured on your computer with the following command.

```bash
gh auth status
```

You should see `Logged in to github.com as <YOUR USERNAME> `, if not, refer to the official [README](https://github.com/cli/cli#installation) to install.

## Setup

Once you have all the prerequisites set up, we will clone our forked repo, and start on the quest! Clone your forked repo with one of the following methods: 

via SSH:

```bash
git clone <YOUR SSH REMOTE URL>
```

via Github CLI:

```bash
gh repo clone <YOUR REPO NAME>
```

Finally, paste the following commands in your terminal to run the necessary steps to finish setting up your local enviroment:

```bash
# Go to folder
cd react-blackjack

# Setup workflow files for Github Actions
cd .github
mv workflow_files workflows
cd ..

# Open folder in your VS code
code .

#Installing Javascript dependencies
npm install

# Run tests
npm test
```

Click the Mark as Complete button to move to the next step when you are done!
