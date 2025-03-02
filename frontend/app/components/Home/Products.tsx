"use client";
import React, {useEffect, useState} from "react";
import ProductCard from "../ProductCard/ProductCard";
import {productProps} from "@/types/productListType";


export default function Products() {
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [productsList, setProductsList] = useState<productProps[]>([]);
    const [allProducts, setAllProducts] = useState<productProps[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch("http://localhost:8080/backend/LoadHomeProducts", {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    setProductsList(data.productsList);
                    setAllProducts((pre) => [...pre, ...data.productsList.slice(0, 4)]);
                } else {
                    console.log("no data")
                }
            } catch (e) {
                console.log(e)
            }
        }
        loadData();
    }, []);

    const handleLoad = () => {
        setLoading(true);

        setTimeout(() => {
            setAllProducts((pre) => [...pre, ...productsList.slice(4, 12)]);
            setLoading(false);
            setLoaded(true);
        }, 1000);
    };

    return (
        <section className="flat-spacing-5 pt_0 flat-seller">
            <div className="container">
                <div className="flat-title">
          <span className="title wow fadeInUp" data-wow-delay="0s">
            Best Seller
          </span>
                    <p className="sub-title wow fadeInUp" data-wow-delay="0s">
                        Shop the Latest Styles: Stay ahead of the curve with our newest
                        arrivals
                    </p>
                </div>
                <div
                    className="grid-layout wow fadeInUp"
                    data-wow-delay="0s"
                    data-grid="grid-4"
                >
                    {allProducts.map((product: productProps, i) => (
                        <ProductCard product={product} key={i}/>
                    ))}
                </div>
                {!loaded && (
                    <div className="tf-pagination-wrap view-more-button text-center">
                        <button
                            className={`tf-btn-loading tf-loading-default style-2 btn-loadmore ${
                                loading ? "loading" : ""
                            } `}
                            onClick={() => handleLoad()}
                        >
                            <span className="text">Load more</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
