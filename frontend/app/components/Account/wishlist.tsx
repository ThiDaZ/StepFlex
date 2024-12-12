"use client";

// import { ProductCardWishlist } from "@/components/ProductCard/ProductCardWishlist";
// import { useContextElement } from "@/context/Context";
// import { products } from "@/data/products";
import Link from "next/link";
// import { useEffect, useState } from "react";
import { ProductCardWishlist } from "../ProductCard/ProductCardWishlist";

interface colorProps {
  colorClass: string;
  imgSrc: string;
  tooltip: string;
  name: string;
}

interface productProps {
  id: number;
  imgSrc: string;
  imgHoverSrc: string;
  alt: string;
  title: string;
  price: number;
  colors: colorProps[];
}

const wishListItems: productProps[] = [
  {
    id: 1,
    imgSrc: "/images/products/sneaker-1.png",
    imgHoverSrc: "/images/products/sneaker-1.png",
    alt: "Product 1",
    title: "Product 1 Title",
    price: 100,
    colors: [
      {
        colorClass: "red",
        imgSrc: "/images/products/sneaker-4.png",
        tooltip: "Red Color",
        name: "Red",
      },
    ],
  },
];

export default function Wishlist() {
//   const { wishList } = useContextElement();
//   const [wishListItems, setWishListItems] = useState<productProps[]>([]);
//   useEffect(() => {
//     if (wishList) {
//       setWishListItems([...products].filter((el) => wishList.includes(el.id)));
//     }
//   }, [wishList]);
  return (
    <div className="my-account-content account-wishlist">
      <div className="grid-layout wrapper-shop" data-grid="grid-3">
        {/* card product 1 */}
        {wishListItems.slice(0, 3).map((elm, i) => (
          <ProductCardWishlist product={elm} key={i} />
        ))}
      </div>
      {!wishListItems.length && (
        <>
          <div
            className="row align-items-center w-100"
            style={{ rowGap: "20px" }}
          >
            <div className="col-lg-3 col-md-6 fs-18">
              Your wishlist is empty
            </div>
            <div className="col-lg-3  col-md-6">
              <Link
                href={`/shop-default`}
                className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
              >
                Explore Products!
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
