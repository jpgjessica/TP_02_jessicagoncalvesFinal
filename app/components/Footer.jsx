import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import logo_WeW from '~/assets/logo_WeW.png';
import NewsletterInput from './NewsletterInput';
import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiTwitterXLine,
} from '@remixicon/react';

/**
 * @param {FooterProps}
 */
export function Footer({footer: footerPromise, header, publicStoreDomain}) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="footer">
            <div className="bg-theme-noir w-full h-full md:h-[350px]">
              <div
                className="bg-[#EFEFEF] w-full rounded-bl-[200px] md:rounded-bl-full h-full md:h-[350px] flex flex-col md:flex-row
               items-start gap-4 md:items-start md:justify-between p-16"
              >
                <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
                  <img
                    src={logo_WeW}
                    className="w-[150px] md:mx-16  md:pt-16"
                    alt="logo wheels and waffles"
                  />
                </NavLink>
                <FooterMenu
                  menu={footer.menu}
                  primaryDomainUrl={header.shop.primaryDomain.url}
                  publicStoreDomain={publicStoreDomain}
                />
                <div>
                  <h3 className="font-sans font-extrabold">
                    Heures d&apos;ouverture
                  </h3>
                  <div className="flex flex-col m-0 p-0 text-sm w-full md:w-52">
                    <ul>
                      <li className="footer_menu_personalise">
                        lundi au jeudi 12:00-17:00
                      </li>
                      <li className="footer_menu_personalise">
                        vendredi 12:00-19:00
                      </li>
                      <li className="footer_menu_personalise">
                        samedi 12:00-17:00
                      </li>
                    </ul>
                    <span>
                      1234, Rue des Riders Montréal, QC H3B 2Y7 Canada
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-sans font-extrabold">Suivez-nous!</h3>
                  <div className="flex flex-row gap-2">
                    <RiFacebookBoxFill size={28} className="cursor-pointer" />
                    <RiInstagramFill size={28} className="cursor-pointer" />
                    <RiTwitterXLine size={28} className="cursor-pointer" />
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start text-left w-fullmd:w-52">
                  <h3 className="font-sans font-extrabold">Infolettre</h3>
                  <span className="text-sm mb-4">
                    Inscrivez-vous pour recevoir nos offres spéciales avant les
                    autres.
                  </span>
                  <NewsletterInput />
                </div>
              </div>
            </div>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
 *   publicStoreDomain: string;
 * }}
 */
function FooterMenu({menu, primaryDomainUrl, publicStoreDomain}) {
  return (
    <>
      <div className="flex flex-col items-start justify-start text-left">
        <h3 className="font-sans font-extrabold">Besoin d&apos;aide?</h3>
        <nav
          className="p-0 m-0 footer-menu flex flex-col text-theme-noir text-sm justify-start items-start"
          role="navigation"
        >
          {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
            if (!item.url) return null;
            // if the url is internal, we strip the domain
            const url =
              item.url.includes('myshopify.com') ||
              item.url.includes(publicStoreDomain) ||
              item.url.includes(primaryDomainUrl)
                ? new URL(item.url).pathname
                : item.url;
            const isExternal = !url.startsWith('/');
            return isExternal ? (
              <a
                href={url}
                key={item.id}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.title}
              </a>
            ) : (
              <NavLink
                end
                key={item.id}
                prefetch="intent"
                style={activeLinkStyle}
                to={url}
              >
                {item.title}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

/**
 * @typedef {Object} FooterProps
 * @property {FooterQuery} footer
 * @property {HeaderQuery} header
 * @property {string} publicStoreDomain
 */

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
