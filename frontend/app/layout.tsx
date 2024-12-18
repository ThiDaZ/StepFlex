"use client";

import "../public/scss/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import {Toaster} from "react-hot-toast";



import {useEffect} from "react";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    useEffect(() => {
        const initializePreloader = () => {
            const preloader = document.getElementById("preloader");
            if (preloader) {
                preloader.classList.add("disabled");
            }
        };

        initializePreloader();
    }, []); // Only runs once on component mount

    return (
        <html lang="en">
        <body className="preload-wrapper">
        <Toaster position="top-right"/>
        <div className="preload preload-container" id="preloader">
            <div className="preload-logo">
                <div className="spinner"></div>
            </div>
        </div>
        {" "}
        <div id="wrapper"> {children}</div>
        </body>
        </html>
    );
}
