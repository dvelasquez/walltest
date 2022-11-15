# Item Manager

This repository contains the source code for the Item Manager, a small tool to search, navigate and favorite items.

## Requisites

This projects uses Node.js v18 and pnpm v7. The project supports 2 node version managers: nvm and volta.

### NVM (Node Version Manager)

NVM is a tool to manage multiple Node.js versions. There are versions for Windows and Unix environments.

- For Linux and OSX: [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- For Windows [nvm Windows](https://github.com/coreybutler/nvm-windows#installation--upgrades))

### Volta

Volta is a tool very similar to NVM with the main difference that it can also support ping package managers like Yarn and NPM.

It also supports Windows, Linux and OSX.

- [Volta](https://docs.volta.sh/guide/getting-started)

### pnpm

You can install pnpm using any of the following commands:

```bash
# Using NPM
npm install -g pnpm

# Using corepack
corepack enable
corepack prepare pnpm@latest --activate

# Using the unix installer
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

```powershell
# Using the powershell installer
iwr https://get.pnpm.io/v7.js -useb | iex
```

More information about pnpm can be found in the [pnpm documentation](https://pnpm.io/installation).

## Getting started

### Development mode

To start the project, you need to install the dependencies and start the development server.

```bash
# Install the dependencies
pnpm install

# Start the development server
pnpm start

# Testing
pnpm test
```

This commands will install the dependencies and start the development server. The development server will be available in [http://localhost:3000](http://localhost:3000).

## Building the project

To build the project, you need to run the following command:

```bash
pnpm build
```

Each time you run this command, the project will be built and the output will be available in the `build` folder.
