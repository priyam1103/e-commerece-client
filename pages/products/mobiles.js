import React, { useState } from "react";
import fetch from "isomorphic-fetch";
import ProductCard from "../../components/ProductCard";
import FiltersCard from "../../components/FiltersCard";
import { Icon } from "semantic-ui-react";
import Backdrop from "../../components/Backdrop";
export default function mobiles({ data, notFound }) {
  console.log(data)
  const [tempdata, setTempData] = useState(data);
  const [filter_d, setFilterData] = useState([]);
  const [showfilter, setShowFilter] = useState(false);
  const [f_data, setFData] = useState({
    price: [],
    ram: null,
    colours: null,
    internal_memory: null,
    brands: null,
  });

  async function handlePriceFilter(name, item) {
    if (f_data.price.includes(item)) {
      f_data.price.splice(f_data.price.indexOf(item), 1);
      setFData((prevState) => {
        return { ...prevState, price: f_data.price };
      });
    } else {
      setFData((prevState) => {
        return { ...prevState, price: prevState.price.concat(item) };
      });
    }
    handleFilter();
  }
  async function handleOFilter(name, item) {
    switch (name.toLowerCase()) {
      case "ram":
        setFData((prevState) => {
          return { ...prevState, ram: item };
        });
        break;
      case "colours":
        setFData((prevState) => {
          return { ...prevState, colours: item };
        });
        break;
      case "internal_memory":
        setFData((prevState) => {
          return { ...prevState, internal_memory: item };
        });
        break;
      case "brands":
        setFData((prevState) => {
          return { ...prevState, brands: item };
        });
        break;
      default:
        return;
    }

    handleFilter();
  }
  async function handleFilter() {
    setFilterData([]);
    var d = [];
    var mobilepricefilter = [];
    setFData((prevState) => {
      var compare_data = data.mobiles;
      prevState.price.map((item) => {
        if (item === "Under ₹1000") {
          mobilepricefilter = [
            ...mobilepricefilter,
            ...data.mobiles.filter((fitem) => fitem.price < 1000),
          ];
        } else if (item === "Over ₹20000") {
          mobilepricefilter = [
            ...mobilepricefilter,
            ...data.mobiles.filter((fitem) => fitem.price >= 20000),
          ];
        } else if (item === "₹5000 - ₹10000") {
          mobilepricefilter = [
            ...mobilepricefilter,
            ...data.mobiles.filter(
              (fitem) => fitem.price >= 5000 && fitem.price < 10000
            ),
          ];
        } else if (item === "₹10000 - ₹20000") {
          mobilepricefilter = [
            ...mobilepricefilter,
            ...data.mobiles.filter(
              (fitem) => fitem.price >= 10000 && fitem.price < 20000
            ),
          ];
        }
      });
      if (mobilepricefilter.length != 0) {
        compare_data = mobilepricefilter;
      }
      if (prevState.ram != null) {
        if (prevState.ram === "8GB & above") {
          compare_data = compare_data.filter((item) => item.ram >= 8);
        }
        if (prevState.ram === "6GB") {
          compare_data = compare_data.filter((item) => item.ram == 6);
        }
        if (prevState.ram === "4GB") {
          compare_data = compare_data.filter((item) => item.ram == 4);
        }
        if (prevState.ram === "3GB") {
          compare_data = compare_data.filter((item) => item.ram == 3);
        }if (prevState.ram === "2GB") {
          compare_data = compare_data.filter((item) => item.ram == 2);
        }
      }
      if (prevState.colours != null) {
        compare_data = compare_data.filter(
          (item) => item.colour === prevState.colours
        );
      }
      if (prevState.internal_memory != null) {
        if (prevState.internal_memory === "8 GB") {
          compare_data = compare_data.filter(
            (item) => item.internal_memory == 8
          );
        }
        if (prevState.internal_memory === "32 GB") {
          compare_data = compare_data.filter(
            (item) => item.internal_memory == 32
          );
        }
        if (prevState.internal_memory === "64 GB") {
          compare_data = compare_data.filter(
            (item) => item.internal_memory == 64
          );
        }
        if (prevState.internal_memory === "128 GB") {
          compare_data = compare_data.filter(
            (item) => item.internal_memory == 128
          );
        }
      }
      if (prevState.brands != null) {
        compare_data = compare_data.filter(
          (item) => item.brand === prevState.brands
        );
      }
      setFilterData((prevState) => {
        setTempData({ ...tempdata, mobiles: compare_data });
        return prevState;
      });
      return { ...prevState };
    });
  }

  return (
    <>
    <div className="products-page">
     <div className="filter-icon-f">
      <Icon name="filter"   style={{ cursor: "pointer", paddingLeft: "1rem" }} size="large" onClick={() => setShowFilter(!showfilter)}/>
      </div>
        <div className={`filters ${showfilter ? 'disp' : 'dontdisp'}`}>
          <div style={{display:"flex",flexDirection:"row"}}>
          <div className="filter-icon-f">
        <Icon name="close" style={{ cursor: "pointer", paddingLeft: "1rem" }} size="large" onClick={() => setShowFilter(!showfilter)} />
        </div>
            <Icon name="repeat" style={{ cursor: "pointer", paddingLeft: "1rem" }} size="large" onClick={() =>
        {
          setTempData(data)
          setFData({
    price: [],
    ram: null,
    colours: null,
    internal_memory: null,
    brands: null,
          })
            }} />
            </div>
          <FiltersCard
          data={tempdata.price}
          name="price"
          f_data={f_data}
          handleFilter={handlePriceFilter}
        />
        <FiltersCard
          data={tempdata.ram}
          f_data={f_data}
          name="ram"
          handleFilter={handleOFilter}
        />
        <FiltersCard
          data={tempdata.colour}
          name="colours"
          f_data={f_data}
          handleFilter={handleOFilter}
        />
        <FiltersCard
          data={tempdata.internal_memory}
          name="internal_memory"
          f_data={f_data}
          handleFilter={handleOFilter}
        />
        <FiltersCard
          data={tempdata.brands}
          name="brands"
          f_data={f_data}
          handleFilter={handleOFilter}
        />
        {/* <FiltersCard
          data={tempdata.discount}
                  name="discount"
                  f_data={f_data}
          handleFilter={handleOFilter}
        /> */}
      </div>
        <div className="productssss">
          {tempdata.mobiles.length != 0 ?
            <ProductCard data={tempdata.mobiles} /> :<p className="message-empty">Opps , bad combination. </p>}
      </div>
      </div>
      {showfilter&&<Backdrop/>}
      </>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(
    `https://dusky-ecommerce.herokuapp.com/api/products/mobiles`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
  console.log(data);
  return {
    props: { data, notFound: false },
  };
}
