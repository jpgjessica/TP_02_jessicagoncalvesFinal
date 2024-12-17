import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import AddToWishlist from '~/components/AddToWishlist';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import Banner from '~/components/Banniere';
import AttributesSection from '~/components/AttributeSection';
import Button from '~/components/Button';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="home">
      <Banner />
      <RecommendedProducts products={data.recommendedProducts} />
      <AttributesSection className="flex flex-row" />
      <Link to="/collections/cyber-week">
        <div className="bg-theme-noir grid md:grid-cols-2 gap-16 md:flex-row text-theme-gris m-0 p-16">
          <div>
            <h2 className="relative text-2xl md:text-5xl font-bold mb-2 uppercase font-sans text-left p-2 overflow-hidden group">
              <span className="relative z-2">CyberWEEK</span>
              <div className="absolute inset-0 bg-theme-mauve-fonce scale-x-0 transform origin-bottom-left transition-transform duration-300 ease-in-out group-hover:scale-x-100"></div>
            </h2>
            <p>
              Découvrez la Collection Cyber Week, une sélection exclusive
              d'offres irrésistibles pour les passionnés de style et de
              performance. Profitez de réductions limitées sur nos meilleurs
              produits, des essentiels de skateboard aux accessoires
              incontournables, tous conçus pour vous offrir qualité et
              durabilité. Que vous soyez débutant ou expert, cette collection
              est l'occasion parfaite pour compléter votre équipement ou faire
              plaisir à vos proches. Ne laissez pas passer ces deals uniques,
              disponibles seulement pendant la Cyber Week – stocks limités,
              faites vite ! 🚀
            </p>
          </div>
          <FeaturedCollection collection={data.featuredCollection} />
        </div>
      </Link>
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products}) {
  const {open} = useAside();
  return (
    <div
      className="recommended-products flex
    flex-col justify-center items-center md:px-16 w-full pt-12"
    >
      <h2 className="text-2xl">Nos coups de coeur</h2>
      <div className="flex gap-28">
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={products}>
            {(response) => (
              <div className="recommended-products-grid">
                {response
                  ? response.products.nodes.map((product) => (
                      <Link
                        key={product.id}
                        className="recommended-product"
                        to={`/products/${product.handle}`}
                      >
                        <Image
                          data={product.images.nodes[0]}
                          aspectRatio="1/1"
                          sizes="(min-width: 45em) 20vw, 50vw"
                        />
                        <div className="flex flex-col">
                          <h4>{product.title}</h4>
                          <div className="flex flex-row justify-between">
                            <small>
                              <Money
                                data={product.priceRange.minVariantPrice}
                              />
                            </small>
                            <AddToWishlist productId={product.id} />
                          </div>
                          <Button>
                            <AddToCartButton
                              onClick={(e) => {
                                e.preventDefault();
                                open('cart');
                              }}
                            ></AddToCartButton>
                            <span>Ajouter au panier</span>
                          </Button>
                        </div>
                      </Link>
                    ))
                  : null}
              </div>
            )}
          </Await>
        </Suspense>
      </div>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: false) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
