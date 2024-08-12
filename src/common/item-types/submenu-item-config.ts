//////////////////////////////////////////////////////////////////////////////////////////
//   _  _ ____ _  _ ___  ____                                                           //
//   |_/  |__| |\ | |  \ |  |    This file belongs to Kando, the cross-platform         //
//   | \_ |  | | \| |__/ |__|    pie menu. Read more on github.com/menu/kando           //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
// SPDX-License-Identifier: MIT

import { IItemConfig } from '../item-config-registry';

/** This class provides the configuration widgets for submenu items. */
export class SubmenuItemConfig implements IItemConfig {
  /** @inheritdoc */
  public getTipOfTheDay(): string {
    const tips = [
      '子菜单可以用来分组。',
      '子菜单里还可以嵌套子菜单。',
      '子菜单可以用来创建复杂的菜单结构。',
      '最好不要在一个菜单里添加十二个以上的菜单项，八个就很棒。',
      '在预览区中，点击某一项的小锁图标可以固定这一项的位置。',
      '在预览区中，拖动菜单项可以排序。',
      '将一个菜单从菜单列表中拖到垃圾桶里就能把它删除。',
      '将一个菜单项拖到垃圾桶里就能把它删除。',
      '录制按键组合时，其实不需要一次按下所有按键，可以一个一个按。',
      '按住 Ctrl 拖动菜单和菜单项，可以复制一个相同的。',
      'Kando 支持在命令行中使用 --menu 参数来打开菜单。',
    ];

    return tips[Math.floor(Math.random() * tips.length)];
  }

  /** Submenus do not have any special settings. Therefore, this method returns `null`. */
  public getConfigWidget(): DocumentFragment | null {
    return null;
  }
}
