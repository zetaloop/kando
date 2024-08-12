//////////////////////////////////////////////////////////////////////////////////////////
//   _  _ ____ _  _ ___  ____                                                           //
//   |_/  |__| |\ | |  \ |  |    This file belongs to Kando, the cross-platform         //
//   | \_ |  | | \| |__/ |__|    pie menu. Read more on github.com/menu/kando           //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
// SPDX-License-Identifier: MIT

import { EventEmitter } from 'events';
import { IMenu } from '../../../common';

/**
 * This class implements a picker that allows the user to tweak the behavior of a menu.
 * The properties of the menu are directly updated when the user changes the values in the
 * picker.
 *
 * @fires close - When the user closes the picker via the 'Done' buttons.
 */
export class AdvancedOptionsPicker extends EventEmitter {
  /** The container to which the picker is appended. */
  private container: HTMLElement = null;

  /**
   * The open at pointer checkbox is a checkbox that allows the user to toggle whether the
   * menu should open at the pointer position.
   */
  private centeredModeCheckbox: HTMLInputElement = null;

  /**
   * The anchored mode checkbox is a checkbox that allows the user to toggle whether
   * submenus should open at the same position as the parent menu.
   */
  private anchoredModeCheckbox: HTMLInputElement = null;

  /** The currently active menu. */
  private menu: IMenu = null;

  /**
   * Creates a new ConditionPicker and appends it to the given container.
   *
   * @param container - The container to which the picker will be appended.
   */
  constructor(container: HTMLElement) {
    super();

    this.container = container;

    const template = require('./templates/advanced-options-picker.hbs');
    container.classList.value = 'd-flex flex-column justify-content-center hidden';
    container.innerHTML = template({
      heading: '调整菜单行为模式。',
      subheading:
        '在开启这些选项之前，我们推荐先学会 Kando 的默认行为模式。<br><a %s>点击查看为何我们这样推荐</a>。'.replace(
          '%s',
          'target="_blank" href="https://github.com/kando-menu/kando/blob/main/docs/usage.md"'
        ),
    });

    // Update the 'centered' property of the menu when the checkbox changes.
    this.centeredModeCheckbox = container.querySelector(
      '#kando-menu-properties-centered-mode'
    ) as HTMLInputElement;
    this.centeredModeCheckbox.addEventListener('change', () => {
      if (this.menu) {
        this.menu.centered = this.centeredModeCheckbox.checked;
      }
    });

    // Update the 'anchored' property of the menu when the checkbox changes.
    this.anchoredModeCheckbox = container.querySelector(
      '#kando-menu-properties-anchored-mode'
    ) as HTMLInputElement;
    this.anchoredModeCheckbox.addEventListener('change', () => {
      if (this.menu) {
        this.menu.anchored = this.anchoredModeCheckbox.checked;
      }
    });

    // Close the picker when the user clicks the Cancel button.
    const doneButton = container.querySelector(
      '#kando-properties-advanced-options-picker-close'
    );
    doneButton.addEventListener('click', () => {
      this.hide();
    });
  }

  /** Shows the picker. The picker will open with the given conditions preselected. */
  public show() {
    this.container.classList.remove('hidden');
  }

  /** Hides the picker. */
  public hide() {
    this.container.classList.add('hidden');
    this.emit('close');
  }

  /** Sets the menu that should be modified by the picker. */
  public setMenu(menu: IMenu) {
    this.menu = menu;
    this.centeredModeCheckbox.checked = menu.centered;
    this.anchoredModeCheckbox.checked = menu.anchored;
  }
}
