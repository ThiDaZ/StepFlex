"use client";
import Footer from "@/app/components/footer/Footer";
import Header from "@/app/components/header/Header";
// import ProductSlider from "@/app/components/ui/ProductSlider";
import Tabs from "@/app/components/ui/Tabs";
import Link from "next/link";
import {useEffect, useState, use} from "react";
import {SingleProduct} from "@/types/SingleProduc";
import DetailsOuterZoom from "@/app/components/ui/DetailsOuterZoom";

interface Params {
    slug: string[];
}

export default function ProductDetailsPage({params}: { params: Promise<Params> }) {
    const { slug } = use(params);
    const [product, setProduct] = useState<SingleProduct|undefined>();

    useEffect(() => {
        const loadData = async () => {
            const id = slug[0];
            try {
                const response = await fetch(`http://localhost:8080/backend/LoadSingleProduct?id=${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.product);
                    setProduct(data.product);
                } else {
                    console.log('Failed to load product:', response.status);
                }
            } catch (error) {
                console.log('Error while fetching product:', error);
            }
        };
        loadData();
    }, [params]);

    return (
        <>
            <Header/>
            <div className="tf-breadcrumb">
                <div className="container">
                    <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
                        <div className="tf-breadcrumb-list">
                            <Link href={`/`} className="text">
                                Home
                            </Link>
                            <i className="icon icon-arrow-right"/>

                            <span className="text">{product?.title}</span>
                        </div>
                    </div>
                </div>
            </div>
            {product && <DetailsOuterZoom {...product} />}
            <Tabs details={product?.description ?? ""}/>
            {/*<ProductSlider params={params}/>*/}
            <Footer/>
        </>
    );
}
