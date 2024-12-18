"use client";
import {useEffect, useState} from "react";
import React from "react";
// import { useContextElement } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import {productProps} from "@/types/productListType";


export default function ProductCard({product}: { product: productProps }) {
    const [currentImage, setCurrentImage] = useState("/images/products/sneaker-1.png?cache-bust=${new Date().getTime()}");

    useEffect(() => {
        const loadData = async () => {
            const imageUrl = "http://localhost:8080/backend/products-images/"
            const imageName = "/image1.png?cache-bust=${new Date().getTime()}"
            const imagePath = imageUrl + product.id + imageName
            setCurrentImage(imagePath)
        };
        loadData();
    }, []);


    return (
        <div className="card-product">
            <div className="card-product-wrapper rounded-0">
                <Link href={`/product-details/${product.id}`} className="product-img">
                    <Image
                        className="lazyload img-product"
                        data-src={currentImage}
                        style={{maxHeight: 360}}

                        alt={product.title}
                        src={currentImage}
                        width={360}
                        height={360}
                    />
                    <Image
                        className="lazyload img-hover"
                        style={{maxHeight: 360}}
                        data-src={currentImage}
                        alt={product.title}
                        src={currentImage}
                        width={360}
                        height={360}
                    />
                </Link>
                <div className="list-product-btn absolute-2">

                </div>

            </div>
            <div className="card-product-info">
                <Link
                    href={`/product-details/${product.id}`}
                    className="title link fw-8"
                >
                    {product.title}
                </Link>
                <span className="price fw-6">LKR{product.price}</span>

            </div>
        </div>
    );
}
