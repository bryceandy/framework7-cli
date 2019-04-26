const indent = require('../utils/indent');
const { colorThemeCSSProperties } = require('../utils/colors');

module.exports = (options) => {
  const {
    template,
    type,
    theming,
  } = options;
  const {
    customColor,
    color,
    fillBars,
  } = theming;

  let styles = '';

  if (type.indexOf('cordova') >= 0) {
    styles += indent(0, `
      /* iOS Cordova Tweak */
      .device-cordova.device-ios {
        height: 100vh;
      }
    `);
  }

  if (customColor && color) {
    const customProps = colorThemeCSSProperties(`${color}`);
    styles += indent(0, `
      /* Custom color theme properties */
      :root {
        ${Object.keys(customProps).map(prop => `${prop}: ${customProps[prop]};`).join('\n        ')}
      }
    `);
  }
  if (fillBars) {
    styles += indent(0, `
      /* Invert navigation bars to fill style */
      :root,
      :root.theme-dark,
      :root .theme-dark {
        --f7-bars-bg-color: var(--f7-theme-color);
        --f7-bars-text-color: #fff;
        --f7-bars-link-color: #fff;
        --f7-navbar-subtitle-text-color: rgba(255,255,255,0.85);
        --f7-bars-border-color: transparent;
        --f7-tabbar-link-active-color: #fff;
        --f7-tabbar-link-inactive-color: rgba(255,255,255,0.54);
        --f7-searchbar-bg-color: var(--f7-bars-bg-color);
        --f7-searchbar-input-bg-color: #fff;
        --f7-searchbar-input-text-color: #000;
        --f7-sheet-border-color: transparent;
        --f7-tabbar-link-active-border-color: #fff;
      }
      .appbar,
      .navbar,
      .toolbar,
      .subnavbar,
      .calendar-header,
      .calendar-footer {
        --f7-touch-ripple-color: var(--f7-touch-ripple-white);
        --f7-link-highlight-color: var(--f7-link-highlight-white);
        --f7-button-text-color: #fff;
        --f7-button-pressed-bg-color: rgba(255,255,255,0.1);
      }
    `);
  }

  if (template === 'split-view') {
    styles += indent(0, `
      /* Left Panel right border when it is visible by breakpoint */
      .panel-left.panel-visible-by-breakpoint:before {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 1px;
        background: rgba(0,0,0,0.1);
        content: '';
        z-index: 6000;
      }

      /* Hide navbar link which opens left panel when it is visible by breakpoint */
      .panel-left.panel-visible-by-breakpoint ~ .view .navbar .panel-open[data-panel="left"] {
        display: none;
      }

      /*
        Extra borders for main view and left panel for iOS theme when it behaves as panel (before breakpoint size)
      */
      .ios .panel-left:not(.panel-visible-by-breakpoint).panel-active ~ .view-main:before,
      .ios .panel-left:not(.panel-visible-by-breakpoint).panel-closing ~ .view-main:before {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 1px;
        background: rgba(0,0,0,0.1);
        content: '';
        z-index: 6000;
      }
    `);
  } else {
    styles += indent(0, `
      /* Your app custom styles here */
    `);
  }

  return styles.trim();
};
