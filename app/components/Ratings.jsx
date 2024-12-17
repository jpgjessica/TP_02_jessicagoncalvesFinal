import React, {useState, useEffect} from 'react';
import {RiStarFill, RiStarLine} from '@remixicon/react';
import Cookies from 'js-cookie';

export default function Ratings(productId) {
  const [rate, setRate] = useState(0);

  useEffect(() => {
    const recoreveredRate = getRatings(productId);
    setRate(recoreveredRate);
  }, [productId]);

  function getRatings(productId) {
    const oldRating = JSON.parse(Cookies.get('ratings') ?? '[]').filter(
      (r) => JSON.stringify(r.idProduct) == JSON.stringify(productId),
    )[0];

    return oldRating === undefined ? 3 : oldRating.rate;
  }

  function setRatingsCookies(newRate) {
    let cookiesRatings = JSON.parse(Cookies.get('ratings') ?? '[]');
    const foundRating = cookiesRatings.filter(
      (r) => JSON.stringify(r.idProduct) == JSON.stringify(productId),
    );
    if (foundRating === undefined || foundRating.length == 0) {
      cookiesRatings.push({rate: newRate, idProduct: productId});
    } else {
      foundRating[0].rate = newRate;
    }
    Cookies.set('ratings', JSON.stringify(cookiesRatings), {
      expires: 7,
      sameSite: 'strict',
    });
  }

  function changeRate(newRate) {
    if (rate == newRate) {
      setRate(newRate - 1);
      setRatingsCookies(newRate - 1);
    } else {
      setRate(newRate);
      setRatingsCookies(newRate);
    }
  }

  return (
    <div className="flex">
      {rate >= 1 ? (
        <RiStarFill
          className="icon"
          onClick={(e) => {
            e.preventDefault();
            changeRate(1);
          }}
        />
      ) : (
        <RiStarLine
          className="icon"
          onClick={(e) => {
            e.preventDefault();
            changeRate(1);
          }}
        />
      )}
      {rate >= 2 ? (
        <RiStarFill
          className="icon"
          onClick={(e) => {
            e.preventDefault();
            changeRate(2);
          }}
        />
      ) : (
        <RiStarLine
          className="icon"
          onClick={(e) => {
            e.preventDefault();
            changeRate(2);
          }}
        />
      )}
      {rate >= 3 ? (
        <RiStarFill
          className="icon"
          onClick={(e) => {
            e.preventDefault();
            changeRate(3);
          }}
        />
      ) : (
        <RiStarLine
          className="icon"
          onClick={(e) => {
            e.preventDefault();
            changeRate(3);
          }}
        />
      )}
      {rate >= 4 ? (
        <RiStarFill
          className="icon"
          onClick={(e) => {
            e.preventDefault();
            changeRate(4);
          }}
        />
      ) : (
        <RiStarLine
          className="icon"
          onClick={(e) => {
            e.preventDefault();
            changeRate(4);
          }}
        />
      )}
      {rate >= 5 ? (
        <RiStarFill
          className="icon"
          onClick={(e) => {
            e.preventDefault();
            changeRate(5);
          }}
        />
      ) : (
        <RiStarLine
          className="icon"
          onClick={(e) => {
            e.preventDefault();
            changeRate(5);
          }}
        />
      )}
    </div>
  );
}
