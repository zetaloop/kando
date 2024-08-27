//////////////////////////////////////////////////////////////////////////////////////////
//   _  _ ____ _  _ ___  ____                                                           //
//   |_/  |__| |\ | |  \ |  |    This file belongs to Kando, the cross-platform         //
//   | \_ |  | | \| |__/ |__|    pie menu. Read more on github.com/menu/kando           //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
// SPDX-License-Identifier: MIT

/**
 * This class is responsible for the sidebar on the left screen edge. It contains some
 * information about Kando in general.
 */
export class Sidebar {
  /**
   * The container is the HTML element which contains the sidebar. It is created in the
   * constructor and returned by the getContainer() method.
   */
  private container: HTMLElement = null;

  /**
   * This variable stores the current visibility of the sidebar. This is also stored in
   * the app settings of the main process. We store it here so that we can avoid
   * unnecessary state changes.
   */
  private visible = true;

  /**
   * The videos are the introduction videos which are shown in the introduction tab. We
   * store them here so that we can pause and play them when the tab is shown and hidden.
   */
  private videos: HTMLVideoElement[] = [];

  /**
   * This variable stores the index of the last visible video. We use it to pause the
   * video when the tab is hidden.
   */
  private lastVisibleVideo = 0;

  /**
   * This constructor creates the HTML elements for the sidebar and wires up all the
   * functionality.
   */
  constructor() {
    this.loadContent();
    this.initVisibility();
    this.initIntroductionVideos();
    this.initButtons();
  }

  /**
   * This method sets the visibility of the sidebar. If saveState is true, the new state
   * will be saved to the app settings.
   *
   * @param visible Whether the sidebar should be visible.
   */
  public setVisibility(visible: boolean) {
    if (this.visible !== visible) {
      if (visible) {
        this.container
          .querySelector('#kando-editor-sidebar-area')
          .classList.add('visible');
        this.container.querySelector('#hide-sidebar-button').classList.add('visible');
        this.container.querySelector('#show-sidebar-button').classList.remove('visible');
      } else {
        this.container
          .querySelector('#kando-editor-sidebar-area')
          .classList.remove('visible');
        this.container.querySelector('#hide-sidebar-button').classList.remove('visible');
        this.container.querySelector('#show-sidebar-button').classList.add('visible');
      }

      this.visible = visible;
      window.api.appSettings.setKey('sidebarVisible', visible);
    }
  }

  /** This method returns the container of the sidebar. */
  public getContainer(): HTMLElement {
    return this.container;
  }

  /** This method loads the HTML content of the sidebar. */
  private loadContent() {
    const introduction = require('./templates/introduction-tab.hbs');
    const buttonTab = require('./templates/button-tab.hbs');
    const sidebar = require('./templates/sidebar.hbs');

    // Initialize the sidebar content.
    this.container = document.createElement('div');
    this.container.innerHTML = sidebar({
      areaId: 'kando-editor-sidebar-area',
      tabs: [
        {
          id: 'sidebar-tab-introduction',
          icon: 'school',
          title: '介绍',
          content: introduction({
            id: 'introduction-slides',
            slides: [
              {
                heading: '点击任何方向:',
                subheading: '不需要准确地点击某个菜单项，只需要点击它的方向即可！',
              },
              {
                heading: '返回:',
                subheading: '点击中心返回上一层。',
              },
              {
                heading: '画笔模式:',
                subheading:
                  '按住并向外拖动进入画笔模式，然后停下不动或转向来打开一个子菜单',
              },
              {
                heading: '极速模式:',
                subheading:
                  '在打开菜单后按住任意键盘按键不放，接下去只要移动光标即可选择。这是最快的操作方法！',
              },
              {
                heading: '不会误触:',
                subheading:
                  '最终选项只会在松开鼠标或键盘按键时触发。利用这个技巧探索一下菜单吧！',
              },
            ],
          }),
        },
        {
          id: 'sidebar-tab-debugging',
          icon: 'ads_click',
          title: '开发',
          content: buttonTab({
            buttons: [
              {
                id: 'dev-tools-button',
                icon: 'code',
                title: '打开开发者工具',
                tooltip: '打开浏览器开发者工具来调试用户界面。',
              },
              {
                id: 'reload-menu-theme-button',
                icon: 'palette',
                title: '重新加载当前菜单主题',
                tooltip:
                  'CSS 改动将会立即生效，对 theme.json 文件的改动则需要重新打开菜单。',
              },
            ],
          }),
        },
      ],
    });
  }

  /**
   * This method initializes the visibility of the sidebar. There's a button to show the
   * sidebar, a button to hide it and the visibility is also stored in the app settings.
   */
  private initVisibility() {
    // Add functionality to show the sidebar.
    this.container
      .querySelector('#show-sidebar-button')
      .addEventListener('click', () => this.setVisibility(true));

    // Add functionality to hide the sidebar.
    this.container
      .querySelector('#hide-sidebar-button')
      .addEventListener('click', () => this.setVisibility(false));

    // Update of the visibility when the app settings are changed from somewhere else.
    window.api.appSettings.onChange('sidebarVisible', (visible) => {
      this.setVisibility(visible);
    });

    // Initialize the visibility from the app settings.
    window.api.appSettings.getKey('sidebarVisible').then((visible) => {
      this.setVisibility(visible);
    });
  }

  /**
   * This method initializes the introduction videos. The videos are loaded from the
   * assets folder and played when the introduction tab is shown. When the tab is hidden,
   * the last visible video is paused. Also, only the video of the currently visible slide
   * is played.
   */
  private initIntroductionVideos() {
    // Add the introduction videos. We do this here because else webpack will not pick them up.
    this.container.querySelector('#sidebar-tab-introduction').addEventListener(
      'show.bs.collapse',
      () => {
        for (let i = 0; i < 5; ++i) {
          this.videos[i] = this.container.querySelector(
            `#introduction-slides-video-${i}`
          ) as HTMLVideoElement;
          this.videos[i].src = require(
            `../../../../assets/videos/introduction-${i + 1}.mp4`
          );
          this.videos[i].loop = true;
        }
      },
      { once: true }
    );

    // Start playing a video when the introduction tab is shown.
    this.container
      .querySelector('#sidebar-tab-introduction')
      .addEventListener('shown.bs.collapse', () => {
        this.videos[this.lastVisibleVideo].currentTime = 0;
        this.videos[this.lastVisibleVideo].play();
      });

    // Pause the last visible video when the introduction tab is hidden.
    this.container
      .querySelector('#sidebar-tab-introduction')
      .addEventListener('hidden.bs.collapse', () => {
        this.videos[this.lastVisibleVideo].pause();
      });

    // Start playing a video when its slide is shown and pause the last visible video.
    this.container
      .querySelector('#sidebar-tab-introduction-content')
      .addEventListener('slide.bs.carousel', (e) => {
        this.videos[this.lastVisibleVideo].pause();
        this.videos[e.to].currentTime = 0;
        this.videos[e.to].play();

        this.lastVisibleVideo = e.to;
      });
  }

  /** This method initializes the buttons in the sidebar. */
  private initButtons() {
    // Show the dev tools if the button is clicked.
    this.container.querySelector('#dev-tools-button').addEventListener('click', () => {
      window.api.showDevTools();
    });

    this.container
      .querySelector('#reload-menu-theme-button')
      .addEventListener('click', () => {
        window.api.reloadMenuTheme();
      });
  }
}
