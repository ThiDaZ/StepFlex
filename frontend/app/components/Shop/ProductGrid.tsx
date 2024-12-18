"use client"
// import { products1 } from "@/data/products";
import React, {useEffect} from "react";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import {Product} from "@/types/shopType";

interface Props {
    gridItems?: number;
    allproducts: Product[];
}

export default function ProductGrid({gridItems = 4, allproducts}: Props) {

    useEffect(() => {
        console.log(allproducts)
    })

    return (
        <div>
            <div
                style={{
                    width: "fit-content",
                    margin: "0  auto",
                    fontSize: "17px",
                    marginBottom: "24px",
                }}
            >
                {allproducts.length} product(s) found
            </div>
            <div className="grid-layout wrapper-shop" data-grid={`grid-${gridItems}`}>
                {allproducts.map((elm, i) => (
                    <ProductCard product={elm} key={i} />
                ))}
            </div>
        </div>
    );
}
