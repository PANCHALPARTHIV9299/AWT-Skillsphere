import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

ThemeProvider.propTypes = {
  /**
   * The content to be rendered within the provider.
   */
  children: PropTypes.node.isRequired,
  /**
   * The HTML attribute to set on the `<html>` element.
   */
  attribute: PropTypes.string,
  /**
   * The default theme to use.
   */
  defaultTheme: PropTypes.string,
  /**
   * Whether to enable the system theme preference.
   */
  enableSystem: PropTypes.bool,
  /**
   * A list of available themes.
   */
  themes: PropTypes.arrayOf(PropTypes.string),
};

ThemeProvider.defaultProps = {
  attribute: 'class',
  defaultTheme: 'system',
  enableSystem: true,
  themes: ['light', 'dark'],
};