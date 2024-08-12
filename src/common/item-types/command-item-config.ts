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
import { IItemData } from './command-item-type';
import * as utils from './utils';

/** This class provides the configuration widgets for command items. */
export class CommandItemConfig implements IItemConfig {
  /** @inheritdoc */
  public getTipOfTheDay(): string {
    const tips = [
      '你可以用命令来启动一个应用和脚本。',
      '如果程序路径包含空格，你需要 "用英文引号括住它"。',
      '使用 {{app_name}} 变量代表打开菜单时正在使用的应用名称。',
      '使用 {{window_name}} 变量代表打开菜单时正在使用的窗口标题。',
      '使用 {{pointer_x}} 和 {{pointer_y}} 变量代表打开菜单时的光标位置。',
    ];

    return tips[Math.floor(Math.random() * tips.length)];
  }

  /** @inheritdoc */
  public getConfigWidget(item: IMenuItem): DocumentFragment | null {
    // Add the checkbox for the delayed execution mode.
    const fragment = utils.renderTemplate(
      require('../../renderer/editor/properties/templates/checkbox-option.hbs'),
      {
        label: '菜单关闭后执行',
        hint: '有些命令需要知道被 Kando 挡住的当前窗口。',
      }
    );

    const delayedInput = fragment.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement;
    delayedInput.checked = (item.data as IItemData).delayed || false;

    delayedInput.addEventListener('change', () => {
      (item.data as IItemData).delayed = delayedInput.checked;
    });

    fragment.append(
      utils.renderTemplate(
        require('../../renderer/editor/properties/templates/text-option.hbs'),
        {
          placeholder: '未设定',
          label: '命令',
          hint: '该命令将被运行。',
        }
      )
    );

    // Get the input element and set the current value.
    const commandInput = fragment.querySelector('input[type="text"]') as HTMLInputElement;
    commandInput.value = (item.data as IItemData).command || '';

    // Listen for changes and update the item.
    commandInput.addEventListener('input', () => {
      (item.data as IItemData).command = commandInput.value;
    });

    return fragment;
  }
}
