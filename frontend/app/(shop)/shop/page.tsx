import React from "react";
import Header from "@/app/components/header/Header";
import Footer from "@/app/components/footer/Footer";
import ShopCollection from "@/app/components/Shop/ShopCollection";

export const metadata = {
    title: "Step Flex",
};
export default function page() {
    return (
        <>
            <Header/>
            <div className="tf-page-title">
                <div className="container-full">
                    <div className="heading text-center">New Arrival</div>
                    <p className="text-center text-2 text_black-2 mt_5">
                        Shop through our latest selection of Fashion
                    </p>
                </div>
            </div>
            <ShopCollection/>
            <Footer/>
        </>
    );
}
