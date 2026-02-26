#!/bin/bash

#Install Electron
npm install electron --save-dev

#Install Electron-forge
npm install --save-dev @electron-forge/cli
npx electron-forge import
sudo pacman -S dpkg, fakeroot