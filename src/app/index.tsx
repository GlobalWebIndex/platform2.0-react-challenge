/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { NavigationItems } from './routes';

export function App() {
  const { i18n } = useTranslation();
  return (
    <>
      <Helmet
        titleTemplate="%s - Cat App"
        defaultTitle="React App"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A cat lover's application" />
      </Helmet>
      <Switch>
        {NavigationItems.map(item => (
          <Route
            exact
            path={item.route}
            key={item.name}
            component={item.component}
          />
        ))}
        <Route component={NotFoundPage} />
      </Switch>

      <GlobalStyle />
    </>
  );
}
