import Link from "next/link";
import React from "react";
import { Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
export default function ProductDetailed({
  product,
  handleVariantState,
  handleColorState,
  changeMainImage,
  user_data,
  pid,
  variantstate,
  colorstate,
  mainImage,
  productstate,
  addToCart,
  addToWishlist,
  authenticated
}) {
  const router = useRouter();
  return (
    <div>
      <div className="product-detailed">
        <div className="sampleimage">
          <img
            src={colorstate.i1}
            onClick={() => changeMainImage(colorstate.i1)}
          />
          <img
            src={colorstate.i2}
            onClick={() => changeMainImage(colorstate.i2)}
          />
        </div>
        <div className="mainimage">
          <img src={mainImage} />
        </div>
        <div className="sample-image">
          <img
            src={colorstate.i1}
            onClick={() => changeMainImage(colorstate.i1)}
          />
          <img
            src={colorstate.i2}
            onClick={() => changeMainImage(colorstate.i2)}
          />
        </div>
        
        <div className="description">
          <p className="name">
            {product.name} - {productstate.varaintname}
          </p>
          <p className="ratings">
            <Icon
              name={variantstate.rating >= 1 ? "star" : "star outline"}
              color="yellow"
            />
            <Icon
              name={variantstate.rating >= 2 ? "star" : "star outline"}
              color="yellow"
            />
            <Icon
              name={variantstate.rating >= 3 ? "star" : "star outline"}
              color="yellow"
            />
            <Icon
              name={variantstate.rating >= 4 ? "star" : "star outline"}
              color="yellow"
            />
            <Icon
              name={variantstate.rating == 5 ? "star" : "star outline"}
              color="yellow"
            />
            <span>{variantstate.ratings} ratings</span>
          </p>
          <div className="border"></div>
          <div className="flex-box">
            <div className="pricing">
              {variantstate.mrp != null && (
                <p className="mrp">
                  M.R.P. : <span>{variantstate.mrp}</span>{" "}
                </p>
              )}
              {
                <p className="price">
                  Deal of the Day : <span>{variantstate.price}</span>{" "}
                </p>
              }
              {variantstate.yousave != null && (
                <p className="yousave">
                  You Save : <span>{variantstate.yousave}</span>
                </p>
              )}
              <p className="tax">Inclusive of all taxes</p>
            </div>
            {authenticated &&
              <div className="cart-wishlist">
                <button
                  className="cart-btn"
                  onClick={() => {
                    user_data.cartprodids.includes(parseInt(productstate.pid))
                      ? null
                      : addToCart();
                  }}
                >
                  {user_data.cartprodids && (
                    <p>
                      {" "}
                      <Icon name="shopping cart" />
                      {user_data.cartprodids.includes(parseInt(productstate.pid))
                        ? "In Cart"
                        : "Add to Cart"}
                    </p>
                  )}
                </button>
                <button
                  className="cart-btn"
                  onClick={() => {
                    user_data.wishlistprodids.includes(parseInt(productstate.pid))
                      ? null
                      : addToWishlist();
                  }}
                >
                  {user_data.wishlistprodids && (
                    <p>
                      {" "}
                      <Icon name="heart" />
                      {user_data.wishlistprodids.includes(
                        parseInt(productstate.pid)
                      )
                        ? "Wishlisted"
                        : "Add to wishlist"}
                    </p>
                  )}
                </button>
              </div>}
          </div>
          <div className="delivery">
            <p className="date">
              <span className="free">FREE delivery by:</span>
              <span className="day"> {new Date(Date.now()).toLocaleDateString()}</span>
            </p>
            <p className="emi">{variantstate.emi}</p>
          </div>
          <div className="color-box">
            <p className="color-name">
              Colour: <span>{productstate.colorname}</span>
            </p>
            <div className="images">
              <img
                onClick={() => {
                  var pid_;
                  for (var i = 0; i < product.pids.length; i++) {
                    if (
                      product.pids[i].colour === product.color[0] &&
                      product.pids[i].variant === productstate.varaintname
                    ) {
                      pid_ = product.pids[i].pid;
                    }
                  }
                  router.push(
                    `/product/mobile/${product.id}/${pid_}/${product.color[0]}/${productstate.varaintname}/apple`
                  );
                  handleColorState(product.color[0]);
                }}
                src={product.images[0].i1}
              />

              <img
                src={product.images[1].i1}
                onClick={() => {
                  var pid_;
                  for (var i = 0; i < product.pids.length; i++) {
                    if (
                      product.pids[i].colour === product.color[1] &&
                      product.pids[i].variant === productstate.varaintname
                    ) {
                      pid_ = product.pids[i].pid;
                    }
                  }
                  router.push(
                    `/product/mobile/${product.id}/${pid_}/${product.color[1]}/${productstate.varaintname}/apple`
                  );
                  handleColorState(product.color[1]);
                }}
              />
            </div>
          </div>
          <div className="variant-box">
            <p className="variant-name">
              Size name: <span>{productstate.varaintname}</span>
            </p>
            <div className="variants">
             
                <p
                  onClick={() => {
                    var pid_;
                    for (var i = 0; i < product.pids.length; i++) {
                      if (
                        product.pids[i].colour === productstate.colorname &&
                        product.pids[i].variant === product.variants[0]
                      ) {
                        pid_ = product.pids[i].pid;
                      }
                    }
                    router.push(
                      `/product/mobile/${product.id}/${pid_}/${productstate.colorname}/${product.variants[0]}/apple`
                    );
                    handleVariantState(product.variants[0]);
                  }}
                >
                  {product.variants[0]}
                </p>
              
             
                <p onClick={() => {
                  var pid_;
                  for (var i = 0; i < product.pids.length; i++) {
                    if (
                      product.pids[i].colour === productstate.colorname &&
                      product.pids[i].variant === product.variants[1]
                    ) {
                      pid_ = product.pids[i].pid;
                    }
                  }
                  router.push(`/product/mobile/${product.id}/${pid_}/${productstate.colorname}/${product.variants[1]}/apple`)
                  handleVariantState(product.variants[1])
                }}>
                  {product.variants[1]}
                </p>
              
            </div>
          </div>
          <div className="desc-list">
            <ul>
              {product.description.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
