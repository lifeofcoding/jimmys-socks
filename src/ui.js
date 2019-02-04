/**
 * Map that contains path to ext icons
 * @type {{ON: string, OFF: string}}
 */
const EXT_ICONS = {
  ON: './assets/icons/icon-on.png',
  OFF: './assets/icons/icon-off.png',
};

export const changeExtensionIcon = proxyActive => {
  const iconPath = proxyActive ? EXT_ICONS.ON : EXT_ICONS.OFF;
  chrome.browserAction.setIcon(
    {
      path: iconPath,
    },
    () => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError);
      }
    }
  );
};
