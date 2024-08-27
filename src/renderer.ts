//////////////////////////////////////////////////////////////////////////////////////////
//   _  _ ____ _  _ ___  ____                                                           //
//   |_/  |__| |\ | |  \ |  |    This file belongs to Kando, the cross-platform         //
//   | \_ |  | | \| |__/ |__|    pie menu. Read more on github.com/kando-menu/kando     //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
// SPDX-License-Identifier: MIT

import './renderer/index.scss';

import { Menu } from './renderer/menu/menu';
import { Editor } from './renderer/editor/editor';
import { MenuTheme } from './renderer/menu/menu-theme';

/**
 * This file is the main entry point for Kando's renderer process. It is responsible for
 * drawing the menu and the editor, as well as handling user input.
 */

// Wire up the menu and the editor -------------------------------------------------------

// We need some information from the main process before we can start. This includes the
// backend info, the menu theme, and the menu theme colors.
Promise.all([
  window.api.getBackendInfo(),
  window.api.getMenuTheme(),
  window.api.getCurrentMenuThemeColors(),
]).then(([info, themeDescription, colors]) => {
  // First, we create a new menu theme and load the description we got from the main
  // process.
  const menuTheme = new MenuTheme();
  menuTheme.loadDescription(themeDescription);
  menuTheme.setColors(colors);

  const reloadMenuTheme = async () => {
    Promise.all([window.api.getMenuTheme(), window.api.getCurrentMenuThemeColors()]).then(
      ([themeDescription, colors]) => {
        menuTheme.loadDescription(themeDescription);
        menuTheme.setColors(colors);
      }
    );
  };

  // We also listen for changes to the menu theme and the menu theme colors.
  window.api.appSettings.onChange('menuThemeColors', () => reloadMenuTheme());
  window.api.appSettings.onChange('darkMenuThemeColors', () => reloadMenuTheme());
  window.api.appSettings.onChange('menuTheme', () => reloadMenuTheme());
  window.api.appSettings.onChange('darkMenuTheme', () => reloadMenuTheme());
  window.api.appSettings.onChange('enableDarkModeForMenuThemes', () => reloadMenuTheme());
  window.api.darkModeChanged(() => reloadMenuTheme());

  // Now, we create a new menu and a new editor. The menu is responsible for rendering
  // the menu items and the editor is responsible for rendering the editor UI.
  const menu = new Menu(document.getElementById('kando-menu'), menuTheme);
  const editor = new Editor(document.getElementById('kando-editor'), info);

  // Show the menu when the main process requests it.
  window.api.showMenu((root, menuOptions, editorOptions) => {
    menu.show(root, menuOptions);
    editor.show(editorOptions);
  });

  // Show the editor when the main process requests it.
  window.api.showEditor((editorOptions) => {
    editor.show(editorOptions);
    editor.enterEditMode();
  });

  // Hide the editor when the main process requests it.
  window.api.hideEditor(() => {
    editor.hide();
    window.api.cancelSelection();
  });

  // Show the update available button when the main process requests it.
  window.api.showUpdateAvailableButton(() => {
    document.getElementById('sidebar-show-new-version-button').classList.remove('d-none');
  });

  // Sometimes, the user may select an item too close to the edge of the screen. In this
  // case, we can not open the menu directly under the pointer. To make sure that the
  // menu is still exactly under the pointer, we move the pointer a little bit.
  menu.on('move-pointer', (dist) => {
    window.api.movePointer(dist);
  });

  // Hide Kando's window when the user aborts a selection.
  menu.on('cancel', () => {
    menu.hide();
    editor.hide();
    window.api.cancelSelection();
  });

  // Hide Kando's window when the user selects an item and notify the main process.
  menu.on('select', (path) => {
    menu.hide();
    editor.hide();
    window.api.selectItem(path);
  });

  // Report hover and unhover events to the main process.
  menu.on('hover', (path) => window.api.hoverItem(path));
  menu.on('unhover', (path) => window.api.unhoverItem(path));

  // Hide the menu when the user enters edit mode.
  editor.on('enter-edit-mode', () => {
    menu.hide();
    window.api.unbindShortcuts();
  });

  // Hide Kando's window when the user leaves edit mode.
  editor.on('leave-edit-mode', () => {
    editor.hide();
    window.api.cancelSelection();
  });

  // Hide the menu or the editor when the user presses escape.
  document.body.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      menu.hide();
      editor.hide();
      window.api.cancelSelection();
    }
  });

  // This is helpful during development as it shows us when the renderer process has
  // finished reloading.
  window.api.log("Successfully loaded Kando's renderer process.");
});
