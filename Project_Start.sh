#!/bin/bash

#Install electron
npm install electron --save-dev

#Install build packages
sudo pacman -S dpkg, fakeroot, wine 
sudo pacman -S --needed libxcrypt libxcrypt-compat

#Install electron-forge
npm install --save-dev @electron-forge/cli
npx electron-forge import

#Install electron-builder
npm install electron-builder --save-dev