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

#Install Angular
sudo npm install -g @angular/cli

#Install Flatpak
sudo pacman -S flatpak flatpak-builder
flatpak install flathub org.freedesktop.Platform//24.08
flatpak install flathub org.freedesktop.Sdk//24.08
flatpak install flathub org.electronjs.Electron2.BaseApp//24.08