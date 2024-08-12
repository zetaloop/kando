//////////////////////////////////////////////////////////////////////////////////////////
//   _  _ ____ _  _ ___  ____                                                           //
//   |_/  |__| |\ | |  \ |  |    This file belongs to Kando, the cross-platform         //
//   | \_ |  | | \| |__/ |__|    pie menu. Read more on github.com/menu/kando           //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
// SPDX-License-Identifier: MIT

import { IMenuItem } from '..';
import { HotkeyPicker } from '../../renderer/editor/properties/hotkey-picker';
import { IItemConfig } from '../item-config-registry';
import { IItemData } from './hotkey-item-type';
import * as utils from './utils';

/** This class provides the configuration widgets for hotkey items. */
export class HotkeyItemConfig implements IItemConfig {
  /** @inheritdoc */
  public getTipOfTheDay(): string {
    const tips = [
      'When recording a hotkey, you do not have to press all keys at once. You can press them one after another.',
      'If you cannot record a key because it is used by the system, try typing its name directly. All valid key names are listed <a href="https://github.com/kando-menu/kando/blob/main/docs/configuring.md#menu-shortcuts-vs-simulated-hotkeys" target="_blank">here</a>.',
    ];

    return tips[Math.floor(Math.random() * tips.length)];
  }

  /** @inheritdoc */
  public getConfigWidget(item: IMenuItem): DocumentFragment | null {
    const fragment = document.createDocumentFragment();

    // Add the checkbox for the delayed execution mode.
    fragment.append(
      utils.renderTemplate(
        require('../../renderer/editor/properties/templates/checkbox-option.hbs'),
        {
          label: '菜单关闭后执行',
          hint: '确保 Kando 不会阻挡按键事件。',
        }
      )
    );

    const input = fragment.querySelector('.form-check-input') as HTMLInputElement;
    input.checked = (item.data as IItemData).delayed || false;

    input.addEventListener('change', () => {
      (item.data as IItemData).delayed = input.checked;
    });

    // Add the hotkey picker.
    const picker = new HotkeyPicker();
    picker.setValue((item.data as IItemData).hotkey || '');
    fragment.append(picker.getContainer());

    picker.on('change', (value: string) => {
      (item.data as IItemData).hotkey = value;
    });

    return fragment;
  }
}
