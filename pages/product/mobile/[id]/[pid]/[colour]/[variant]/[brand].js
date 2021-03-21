import React, { useEffect, useState } from "react";
import fetch from "isomorphic-fetch";
import ProductDetailed from "../../../../../../../components/ProductDetailed";
import axios from "axios";
import { useRouter } from "next/router";
import Backdrop from "../../../../../../../components/Backdrop"
import Loader from "../../../../../../../components/Loader" 
import { useAppState } from "../../../../../../../context/GlobalState";
// export async function getStaticPaths() {
//   const res = await fetch(
//     "https://dusky-ecommerce.herokuapp.com/api/products/mobiles"
//   );
//   const items = await res.json();
//   const paths = items.mobiles.map((item) => ({
//     params: { id: item.details_id.toString() },
//   }));
//   return { paths, fallback: false };
// }

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `https://dusky-ecommerce.herokuapp.com/api/products/mobiledetails/${params.id}`
  );
  const product = await res.json();
  return { props: { product, ...params } };
}

export default function MobileDetails({
  product,
  brand,
  colour,
  variant,
  pid,
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { updateUser, user_data,authenticated } = useAppState();
  const [p_details, setPDetails] = useState({
    brand: brand,
    colour: colour,
    variant: variant,
  });

  const [productstate, setProductState] = useState({
    varaintname: variant,
    colorname: colour,
    pid:pid
  });
  const [variantstate, setVariantState] = useState(product.variant[0]);
  const [colorstate, setColorState] = useState({
    i1: "",
    i2: "",
  });
  const [mainimage, setMainImage] = useState();
  useEffect(() => {
    setProductState({ varaintname: variant, colorname: colour ,pid:pid});
    var index = product.color.indexOf(colour);
    setColorState({
      i1: product.images[index].i1,
      i2: product.images[index].i2,
    });

    setMainImage(product.images[index].i1);

    var index_ = product.variants.indexOf(variant);
    setVariantState(product.variant[index_]);
  }, [colour, variant,pid]);

  function handleColorState(value) {
    // var index = product.color.indexOf(value);
    // setColorState({
    //   i1: product.images[index].i1,
    //   i2: product.images[index].i2,
    // });
    // setProductState({ ...productstate, colorname: value });
    // setMainImage(product.images[index].i1);
  }
  function handleVariantState(value) {
    // var index = product.variants.indexOf(value);
    // setVariantState(product.variant[index]);
    // setProductState({ ...productstate, varaintname: value });
  }
  function changeMainImage(value) {
    setMainImage(value);
  }
  async function addToCart() {
    setLoading(true);
    const token = await localStorage.getItem("dusky-ecomm");
    if (token) {
      await axios
        .post(
          "https://dusky-ecomm.herokuapp.com/api/user/work/addtocart",
          { pid: productstate.pid },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          updateUser(res.data.user);
          setLoading(false);
          router.push("/cart");
        }).catch((err) => {
          setLoading(false);
        })
    } else {
      alert("Please login")
    }
  }
  async function addToWishlist() {
    setLoading(true);
    const token = await localStorage.getItem("dusky-ecomm");
    if (token) {
      await axios
        .post(
          "https://dusky-ecomm.herokuapp.com/api/user/work/addtowishlist",
          { pid: productstate.pid },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          updateUser(res.data.user);
        })
        .catch((err) => {
          setLoading(false);
      })
    } else {
      alert("Please Login")
    }
  }
  return (
    <div style={{ paddingTop: "10rem" }}>
      <ProductDetailed
        product={product}
        handleColorState={handleColorState}
        handleVariantState={handleVariantState}
        changeMainImage={changeMainImage}
        addToCart={addToCart}
        addToWishlist={addToWishlist}
        pid={pid}
        variantstate={variantstate}
        colorstate={colorstate}
        mainImage={mainimage}
        productstate={productstate}
        user_data={user_data}
        authenticated={authenticated}
      />
      {loading&&(<><Backdrop/><Loader/></>)}
    </div>
  );
}
