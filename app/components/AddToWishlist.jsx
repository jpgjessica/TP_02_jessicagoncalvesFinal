import React, {useState, useEffect} from 'react';
import {RiHeart3Fill, RiHeart3Line} from '@remixicon/react';
import Cookies from 'js-cookie';

const AddToWishlist = ({productId, onRemove = (productId) => {}}) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const wishlist = getWishedList();

    setIsInWishlist(wishlist[productId] === true);
  }, [productId]);

  function getWishedList() {
    return JSON.parse(Cookies.get('wishlist') ?? '{}');
  }

  function setWishedList(wishlist) {
    Cookies.set('wishlist', JSON.stringify(wishlist), {
      expires: 7,
      sameSite: 'strict',
    });
  }

  const toggleWishlist = (e) => {
    e.preventDefault();
    const wishlist = getWishedList();

    if (isInWishlist) {
      delete wishlist[productId];
      setWishedList(wishlist);
      setIsInWishlist(false);
      onRemove(productId);
    } else {
      wishlist[productId] = true;
      setWishedList(wishlist);
      setIsInWishlist(true);
    }
  };

  return (
    <button onClick={toggleWishlist} className="wishlist-button">
      {isInWishlist ? (
        <RiHeart3Fill className="icon icon-filled" />
      ) : (
        <RiHeart3Line className="icon icon-outline" />
      )}
      {/* {isInWishlist ? 'Retirer de la Wishlist' : 'Ajouter à la Wishlist'} */}
    </button>
  );
};

export default AddToWishlist;
