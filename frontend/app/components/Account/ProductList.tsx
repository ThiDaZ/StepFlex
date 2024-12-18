"use client";

import Link from "next/link";
import ProductCardUser from "@/app/components/ProductCard/ProductCardUser";
import {useEffect, useState} from "react";
import {productProps} from "@/types/productListType";


export default function ProductList() {

    const [ProductListData, setProductListData] = useState<productProps[]>([]);

    useEffect(() => {
        const loadData = async () => {

            try {
                const response = await fetch(`http://localhost:8080/backend/LoadUserProducts`, {
                    method: "GET",
                    credentials: "include",
                })

                if (response.ok) {
                    const data = await response.json()
                    if(data.userProductsList){
                        setProductListData(data.userProductsList)
                        console.log(data.userProductsList);
                    }else{
                        console.log("no data")
                    }

                }
            } catch (e) {
                console.log(e)
            }

        }
        loadData()
    },[])

    return (
        <div className="my-account-content account-wishlist">
            <div className="grid-layout wrapper-shop" data-grid="grid-3">
                {/* card product 1 */}
                {ProductListData.slice(0, 12).map((elm, i) => (
                    <ProductCardUser product={elm} key={i}/>
                ))}
            </div>
            {!ProductListData.length && (
                <>
                    <div
                        className="row align-items-center w-100"
                        style={{rowGap: "20px"}}
                    >
                        <div className="col-lg-3 col-md-6 fs-18">
                            Your Product List is empty
                        </div>
                        <div className="col-lg-3  col-md-6">
                            <Link
                                href={`/my-products`}
                                className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                            >
                                Add Products!
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
