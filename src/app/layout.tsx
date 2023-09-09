import '../styles/global.scss';

import BreakingNews from '../components/BreakingNews';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Line from '../components/Line';
import React, { Fragment } from 'react';
import Script from 'next/script';
import Site from '../data/site.json';
import { SiteInterface } from '../interfaces';

/**
 * Render the site layout.
 *
 * @return {React.JSX.Element}
 */
export default function RootLayout({ children }): React.JSX.Element {
  const site: SiteInterface = Site;

  return (
    <html>
      <body>

        { process.env.GOOGLE_TAG && (
          <Fragment>
            <Script src={'https://www.googletagmanager.com/gtag/js?id=' + process.env.GOOGLE_TAG } />
            <Script id="google-analytics">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ process.env.GOOGLE_TAG }');
              `}
            </Script>
          </Fragment>
        ) }

        <div className={ 'layout' }>
          <Header
            author={ site.author }
            title={ site.title }
            description={ site.description }
            links={ site.links }
            contact={ site.contact }
            events={ site.events }
            countries={ site.countries }
            settings={ site.settings }
          />

          <Line />

          <BreakingNews
            news={ site.news }
            settings={ site.settings }
          />

          { children }

          <Line />

          <Footer
            author={ site.author }
            partners={ site.partners }
            brands={ site.brands }
            settings={ site.settings }
          />
        </div>

      </body>
    </html>
  );
}
