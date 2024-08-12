//////////////////////////////////////////////////////////////////////////////////////////
//   _  _ ____ _  _ ___  ____                                                           //
//   |_/  |__| |\ | |  \ |  |    This file belongs to Kando, the cross-platform         //
//   | \_ |  | | \| |__/ |__|    pie menu. Read more on github.com/menu/kando           //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
// SPDX-License-Identifier: MIT

import { IMenuItem } from '..';
import { IItemConfig } from '../item-config-registry';
import { IItemData } from './uri-item-type';
import * as utils from './utils';

/** This class provides the configuration widgets for URI items. */
export class URIItemConfig implements IItemConfig {
  /** @inheritdoc */
  public getTipOfTheDay(): string {
    const tips = [
      '使用 http:// 协议来打开网址。',
      '使用 file:// 协议来打开文件和文件夹。',
      '使用 mailto:// 协议来打开邮箱。',
    ];

    return tips[Math.floor(Math.random() * tips.length)];
  }

  /** @inheritdoc */
  public getConfigWidget(item: IMenuItem): DocumentFragment | null {
    const fragment = utils.renderTemplate(
      require('../../renderer/editor/properties/templates/text-option.hbs'),
      {
        placeholder: '未设定',
        label: 'URI 地址',
        hint: '该地址将被打开。',
      }
    );

    // Get the input element and set the current value.
    const input = fragment.querySelector('input');
    input.value = (item.data as IItemData).uri || '';

    // Listen for changes and update the item.
    input.addEventListener('input', () => {
      (item.data as IItemData).uri = input.value;
    });

    return fragment;
  }
}
