import {useLoaderData, Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import AddToWishlist from '~/components/AddToWishlist';
import {useState} from 'react';

export async function loader({context, request}) {
  const cookie = request.headers
    .get('Cookie')
    .split('; ')
    .map((cookie) => cookie.split('='));

  const savedWishList = cookie.find((item) => item[0] === 'wishlist');

  if (savedWishList) {
    const wishedListValue = JSON.parse(decodeURIComponent(savedWishList[1]));
    const productIds = Object.keys(wishedListValue);

    const data = await context.storefront.query(PRODUCTS_QUERY, {
      variables: {ids: productIds},
    });
    return {products: data.nodes};
  }
  return {products: []};
}

export default function Wishlist() {
  const [dataProducts, setDataProducts] = useState(useLoaderData());

  function removeProduct(productId) {
    const newList = dataProducts.products.filter(
      (product) => product.id != productId,
    );

    const newData = {
      ...dataProducts,
      products: newList,
    };

    setDataProducts(newData);
  }

  return (
    <div className="grid grid-cols-5 gap-5">
      {dataProducts.products
        .filter((product) => product)
        .map((product) => (
          <Link
            key={product.id}
            className="recommended-product"
            to={`/products/${product.handle}`}
          >
            <Image
              alt={product.featuredImage.altText || product.title}
              aspectRatio="1/1"
              src={product.featuredImage.url}
              sizes="(min-width: 45em) 20vw, 50vw"
            />
            <h4>{product.title}</h4>
            <AddToWishlist productId={product.id} onRemove={removeProduct} />
            <small>
              <Money data={product.priceRange.minVariantPrice} />
            </small>
          </Link>
        ))}
    </div>
  );
}

const PRODUCTS_QUERY = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  query Products($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        handle
        featuredImage{
          url(transform: {maxHeight: 200, maxWidth: 200})
        }
        priceRange {
          minVariantPrice {
            ...MoneyProductItem
          }
          maxVariantPrice {
            ...MoneyProductItem
          }
        }
      }
    }
  }
`;
