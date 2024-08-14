<!--
SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
SPDX-License-Identifier: CC-BY-4.0
-->

> [!TIP]
> This is the community Chinese localization version of Kando. For the original version, please visit [kando-menu/kando](https://github.com/kando-menu/kando)。<br>
> 这是 Kando 的社区汉化版，原版请访问 [kando-menu/kando](https://github.com/kando-menu/kando)。

<p align="center">
  <a href="https://www.youtube.com/watch?v=vOE7EAlPUwE"><img src="docs/img/video.jpg" /></a>
</p>

<kbd>汉化</kbd>
[![checks](https://github.com/zetaloop/kando/actions/workflows/checks.yml/badge.svg?branch=main)](https://github.com/zetaloop/kando/actions)
[![reuse](https://api.reuse.software/badge/github.com/zetaloop/kando)](https://api.reuse.software/info/github.com/zetaloop/kando)
[![downloads](https://img.shields.io/github/downloads/zetaloop/kando/total?label=Downloads)](https://github.com/zetaloop/kando/releases)
<kbd>原版</kbd>
[![sponsors](https://gist.githubusercontent.com/Schneegans/2d06edf0937c480951feb86b9e719304/raw/weekly.svg)](https://schneegans.github.io/sponsors/)
[![Discord](https://img.shields.io/discord/1124300911574003732?logo=discord&label=Discord&color=%235865f2)](https://discord.gg/hZwbVSDkhy)
[![docs](https://img.shields.io/badge/Documentation-online-purple.svg?labelColor=303030)](docs/README.md)

# Kando 是啥？

**Kando 是一个跨平台的饼状桌面快捷菜单。** 它创造了一种独特、快捷、高效且有趣的交互方式！您可以使用 Kando 来启动应用、模拟键盘按键、打开文件等。 

Kando 生来就为 🖱️ 鼠标、🖊️ 手写笔和👆 触摸屏所设计。但如果您大部分时间都双手敲击键盘，那或许应该考虑其他更合适的工具。

欢迎加入 💬 [官方 Discord（英文）](https://discord.gg/hZwbVSDkhy) 来与 Kando 的爱好者们讨论项目发展、询问操作问题，闲聊也行！

<p align="center">
  <img src="docs/img/kando.gif"/>
</p>


## 支持的平台

跨平台实现 Kando 这样的快捷菜单，说实话并不容易。<br>
诸如在打开窗口之前获取鼠标位置、模拟按键操作、获取当前聚焦的窗口名称等功能，都需要在每个平台上单独实现。

目前为止，Kando 已在下列平台中通过测试：

测试环境 | :heavy_check_mark: | 注释
:-- | :---: | ---
<img height="14" width="14" src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Windows_logo_-_2021_%28Black%29.svg" /> Windows | :heavy_check_mark: | 测试于 Windows 11。
<img height="14" width="14" src="https://cdn.simpleicons.org/apple" /> macOS | :heavy_check_mark: | 测试于 macOS 11。
<img height="14" width="14" src="https://cdn.simpleicons.org/linux/black" /> GNOME / X11 | :heavy_check_mark: |
<img height="14" width="14" src="https://cdn.simpleicons.org/linux/black" /> GNOME / Wayland | :heavy_check_mark: | 需要 [GNOME Shell 扩展适配器](https://github.com/kando-menu/gnome-shell-integration) 以提供 Kando 通信的 DBus 接口。
<img height="14" width="14" src="https://cdn.simpleicons.org/linux/black" /> KDE / X11 | :heavy_check_mark: |
<img height="14" width="14" src="https://cdn.simpleicons.org/linux/black" /> KDE / Wayland | :heavy_check_mark: | 支持 Plasma 5 和 Plasma 6。详情阅读 [特定平台注意事项](docs/installing.md#platform-specific-notes)。
<img height="14" width="14" src="https://cdn.simpleicons.org/linux/black" /> Hyprland | :heavy_check_mark: | 详情阅读 [特定平台注意事项](docs/installing.md#platform-specific-notes)。
<img height="14" width="14" src="https://cdn.simpleicons.org/linux/black" /> XFCE | :heavy_check_mark: |
<img height="14" width="14" src="https://cdn.simpleicons.org/linux/black" /> MATE | :heavy_check_mark: |
<img height="14" width="14" src="https://cdn.simpleicons.org/linux/black" /> Budgie | :heavy_check_mark: |
<img height="14" width="14" src="https://cdn.simpleicons.org/linux/black" /> Cinnamon | :heavy_check_mark: |
<img height="14" width="14" src="https://cdn.simpleicons.org/linux/black" /> LXQt | :heavy_check_mark: |
<img height="14" width="14" src="https://cdn.simpleicons.org/linux/black" /> LXDE | :heavy_check_mark: | 需要窗口合成器才能实现透明效果。
<img height="14" width="14" src="https://cdn.simpleicons.org/linux/black" /> Openbox | :heavy_check_mark: | 需要窗口合成器才能实现透明效果。
<img height="14" width="14" src="https://cdn.simpleicons.org/linux/black" /> i3 | :heavy_check_mark: | 需要窗口合成器才能实现透明效果。
<img height="14" width="14" src="https://cdn.simpleicons.org/linux/black" /> dusk | :heavy_check_mark: | 需要窗口合成器才能实现透明效果。详情阅读 [特定平台注意事项](docs/installing.md#platform-specific-notes)。


# :package: 安装

可以直接下载安装包，也可以选择自己编译。详细说明请查看 [:memo: 安装指南](docs/installing.md)。

# :rocket: 开始使用

Kando 自带一个示例菜单，按 <kbd>Ctrl</kbd>+<kbd>Space</kbd> 打开，请试着玩玩！想知道基本的交互技巧，可以阅读 [:memo: 使用指南](docs/usage.md)。

当您熟悉了基本操作，就可以试着自己创建一个菜单了。查看 [:memo: 配置指南](docs/configuring.md) 了解如何创建菜单！

# :revolving_hearts: 我想贡献力量！

作者：**我是出于纯粹的热情创造了 Kando。** 这个项目完全免费，没有任何商业化的计划。但如果你能够提供创意、贡献代码，或者将它分享给你的朋友和粉丝来支持这个项目，我会非常开心的！ 💖

[![kofi](https://img.shields.io/badge/赞助-Ko--fi-ff5e5b?logo=ko-fi)](https://ko-fi.com/schneegans)
[![github](https://img.shields.io/badge/赞助-GitHub-purple?logo=github)](https://github.com/sponsors/Schneegans)
[![paypal](https://img.shields.io/badge/赞助-PayPal-009cde?logo=paypal)](https://www.paypal.com/donate/?hosted_button_id=3F7UFL8KLVPXE)
[![crypto](https://img.shields.io/badge/赞助-Crypto-f7931a?logo=bitcoin)](https://schneegans.cb.id)

虽然直接贡献代码是支持项目继续下去的最佳方式，但赞助也将激励我在业余时间继续开发自由开源的软件。

**这些了不起的人们为我的开源项目开发提供了资金支持：**

<a href="https://schneegans.github.io/sponsors/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://schneegans.github.io/sponsors/sponsors_dark_small.svg">
    <img alt="Sponsors List" src="https://schneegans.github.io/sponsors/sponsors_light_small.svg#gh-light-mode-only">
  </picture>
</a>

## 鸣谢

该自述文档使用了 [Simple Icons](https://simpleicons.org/) 的图标。

<p align="center"><img src ="docs/img/hr.svg" /></p>
