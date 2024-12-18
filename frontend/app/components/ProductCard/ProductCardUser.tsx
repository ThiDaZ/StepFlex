"use client";
import {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import {productProps} from "@/types/productListType";


export default function ProductCardUser({product}: { product: productProps }) {
    const [currentImage, setCurrentImage] = useState("/images/products/sneaker-1.png");
    console.log(currentImage)

    useEffect(() => {
        const loadData = async () => {
            const imageUrl = "http://localhost:8080/backend/products-images/"
            const imageName = "/image1.png"
            const imagePath = imageUrl + product.id + imageName
            setCurrentImage(imagePath)
        };
        loadData();
    }, []);

    return (
        <div className="card-product fl-item" key={product.id}>
            <div className="card-product-wrapper" style={{backgroundColor: "#f3f3f3"}}>
                <Link href={`/product-details/${product.id}`} className="product-img">
                    <Image
                        className="lazyload img-product"
                        data-src={currentImage}
                        src={currentImage}
                        alt="image-product"
                        width={720}
                        height={1005}
                    />
                    <Image
                        className="lazyload img-hover"
                        data-src={
                            currentImage
                        }
                        src={currentImage}
                        alt="image-product"
                        width={720}
                        height={1005}
                    />
                </Link>
                <div className="list-product-btn type-wishlist">
                    <a
                        // onClick={() => removeFromWishlist(product.id)}
                        className="box-icon bg_white wishlist"
                    >
                        <span className="tooltip">Remove Wishlist</span>
                        <span className="icon icon-delete"/>
                    </a>
                </div>


                {product.size && (
                    <div className="size-list">

                        <span>{product.size.name}</span>

                    </div>
                )}
            </div>
            <div className="card-product-info">
                <Link href={`/product-detail/${product.id}`} className="title link">
                    {product.title}
                </Link>

                <span className="title">{product.brand.name}</span>
                <span className="price">LKR {product.price.toFixed(2)}</span>


            </div>
        </div>
    )
}