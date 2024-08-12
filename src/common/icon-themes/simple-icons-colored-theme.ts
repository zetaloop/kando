//////////////////////////////////////////////////////////////////////////////////////////
//   _  _ ____ _  _ ___  ____                                                           //
//   |_/  |__| |\ | |  \ |  |    This file belongs to Kando, the cross-platform         //
//   | \_ |  | | \| |__/ |__|    pie menu. Read more on github.com/menu/kando           //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
// SPDX-License-Identifier: MIT

import { SimpleIconsTheme } from './simple-icons-theme';

/**
 * This class implements an icon theme that uses the Simple Icons font as icons. It colors
 * the icons using the `si--color` class.
 */
export class SimpleIconsColoredTheme extends SimpleIconsTheme {
  /** Returns a human-readable name of the icon theme. */
  get name() {
    return 'Simple Icons 彩色';
  }

  /**
   * Creates a div element that contains the icon with the given name.
   *
   * @param icon One of the icons returned by `listIcons`.
   * @returns A div element that contains the icon.
   */
  createDiv(icon: string) {
    const containerDiv = super.createDiv(icon);

    const iconDiv = containerDiv.childNodes[0] as HTMLElement;
    iconDiv.classList.add('si--color');

    return containerDiv;
  }
}
