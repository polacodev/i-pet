/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const LIGHT_BACKGROUND_SECONDARY_COLOR = '#ffffff';

export const LIGHT_BACKGROUND_PRIMARY_COLOR = '#f6f6f6';
export const DARK_BACKGROUND_PRIMARY_COLOR = '#121212';

export const LIGHT_TEXT_COLOR = '#11181C';
export const DARK_TEXT_COLOR = '#ecedee';

export const BORDER_COLOR_FORM = '#22D3EE';

export const Colors = {
  light: {
    title: '#155e75',
    text: LIGHT_TEXT_COLOR,
    textToast: DARK_TEXT_COLOR,
    placeholder: '#8e8e8e',
    borderCard: '#d1d1d1',
    background: LIGHT_BACKGROUND_PRIMARY_COLOR,
    backgroundToast: DARK_BACKGROUND_PRIMARY_COLOR,
    icon: '#164e63',
    smallText: '#6b7280',
    backgroundHeaderIcon: LIGHT_BACKGROUND_SECONDARY_COLOR,
    highlightText: '#22D3EE',
  },
  dark: {
    title: '#67e8f9',
    text: DARK_TEXT_COLOR,
    textToast: LIGHT_TEXT_COLOR,
    placeholder: '#5d5d5d',
    borderCard: '#3d3d3d',
    background: DARK_BACKGROUND_PRIMARY_COLOR,
    backgroundToast: LIGHT_BACKGROUND_PRIMARY_COLOR,
    icon: '#67e8f9',
    smallText: '#9ca3af',
    backgroundHeaderIcon: DARK_BACKGROUND_PRIMARY_COLOR,
    highlightText: LIGHT_BACKGROUND_SECONDARY_COLOR,
  },
};
