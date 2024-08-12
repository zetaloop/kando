//////////////////////////////////////////////////////////////////////////////////////////
//   _  _ ____ _  _ ___  ____                                                           //
//   |_/  |__| |\ | |  \ |  |    This file belongs to Kando, the cross-platform         //
//   | \_ |  | | \| |__/ |__|    pie menu. Read more on github.com/menu/kando           //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
// SPDX-License-Identifier: MIT

import JSON5 from 'json5';

import { IMenuItem } from '..';
import { MacroPicker } from '../../renderer/editor/properties/macro-picker';
import { IItemConfig } from '../item-config-registry';
import { IItemData } from './macro-item-type';
import * as utils from './utils';

/** This class provides the configuration widgets for macro items. */
export class MacroItemConfig implements IItemConfig {
  /** @inheritdoc */
  public getTipOfTheDay(): string {
    const tips = [
      '所有可用的按键名称 <a href="https://github.com/kando-menu/kando/blob/main/docs/configuring.md#valid-simulated-hotkeys-using-key-codes" target="_blank">都在这里列出</a>。',
      '每个按键事件默认延迟 10ms，你可以修改 "delay" 属性来设定延迟时长。',
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

    // Add the macro picker.
    const picker = new MacroPicker();
    picker.setValue(
      JSON5.stringify((item.data as IItemData).macro)
        .replace(/\[/g, '')
        .replace(/\]/g, '')
    );
    fragment.append(picker.getContainer());

    picker.on('change', (value: string) => {
      (item.data as IItemData).macro = JSON5.parse('[' + value + ']');
    });

    return fragment;
  }
}
