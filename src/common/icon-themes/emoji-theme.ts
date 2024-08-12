//////////////////////////////////////////////////////////////////////////////////////////
//   _  _ ____ _  _ ___  ____                                                           //
//   |_/  |__| |\ | |  \ |  |    This file belongs to Kando, the cross-platform         //
//   | \_ |  | | \| |__/ |__|    pie menu. Read more on github.com/menu/kando           //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
// SPDX-License-Identifier: MIT

import { matchSorter } from 'match-sorter';
import emojis from 'emojilib';

import { IIconTheme } from '../icon-theme-registry';

/**
 * This class implements an icon theme that uses emojis as icons. It uses the `emojilib`
 * package to get a list of emojis and their descriptions.
 */
export class EmojiTheme implements IIconTheme {
  /**
   * This array contains all emojis and their descriptions. Each inner array contains the
   * emoji itself as first element and all descriptions as following elements.
   */
  private icons: Array<Array<string>> = [];

  constructor() {
    // Transform the emoji lib object into a nested array where each inner array contains
    // the emoji itself and all descriptions.
    this.icons = Object.entries(emojis).map(([emoji, descriptors]) => {
      return [emoji, ...descriptors];
    });
  }

  /** Returns a human-readable name of the icon theme. */
  get name() {
    return '表情符号';
  }

  /**
   * Returns a list of emojis that match the given search term. The search uses the
   * description of the emojis.
   *
   * @param searchTerm The search term to filter the icons.
   * @returns An array of emojis that match the search term.
   */
  public async listIcons(searchTerm: string) {
    return matchSorter(this.icons, searchTerm, {
      threshold: matchSorter.rankings.CONTAINS,
    }).map(([emoji]) => emoji);
  }

  /**
   * Creates a div element that contains the icon with the given name.
   *
   * @param icon One of the icons returned by `listIcons`.
   * @returns A div element that contains the icon.
   */
  createDiv(icon: string) {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('icon-container');

    const iconDiv = document.createElement('i');
    containerDiv.appendChild(iconDiv);

    iconDiv.classList.add('emoji-icon');
    iconDiv.innerText = icon;

    return containerDiv;
  }
}
