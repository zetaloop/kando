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
      '录制按键组合时，其实不需要一次按下所有按键，可以一个一个按。',
      '如果系统占用等因素导致你无法录制某个按键，可以试试直接输入按键名称。<br>所有可用的按键名称 <a href="https://github.com/kando-menu/kando/blob/main/docs/configuring.md#menu-shortcuts-vs-simulated-hotkeys" target="_blank">都在这里列出</a>。',
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
