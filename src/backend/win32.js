//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//     |  /  __|   \ |       _ \   _ \     This file belongs to Ken-Do, the truly       //
//     . <   _|   .  | ____| |  | (   |    amazing cross-platform marking menu.         //
//    _|\_\ ___| _|\_|      ___/ \___/     Read more on github.com/ken-do-menu/ken-do   //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
// SPDX-License-Identifier: MIT

const electron = require('electron');
const {exec}   = require('node:child_process');

export default class Backend {
  constructor() {
    console.log('Win32 backend created');
  }

  connect() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  getPointer() {
    return new Promise(resolve => {
      let pos = electron.screen.getCursorScreenPoint();
      resolve({x: pos.x, y: pos.y, mods: 0});
    });
  }

  getFocusedWindow() {
    return new Promise((resolve, reject) => {
      exec('dir', (err, stdout) => {
        if (err) {
          reject(err);
          return;
        }

        // ...
        //   resolve({name: title, wmClass: wmClass});
        resolve({name: 'title', wmClass: 'wmClass'});
      });
    });
  }

  simulateShortcut(shortcut) {
    return new Promise((resolve, reject) => {
      exec(`dir`, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  bindShortcut(shortcut, callback) {
    return new Promise((resolve, reject) => {
      if (electron.globalShortcut.register(shortcut, callback)) {
        resolve();
      } else {
        reject('Shortcut is already in use.');
      }
    });
  }

  unbindShortcut(shortcut) {
    return new Promise(resolve => {
      electron.globalShortcut.unregister(shortcut);
      resolve();
    });
  }

  unbindAllShortcuts() {
    return new Promise(resolve => {
      electron.globalShortcut.unregisterAll();
      resolve();
    });
  }
}