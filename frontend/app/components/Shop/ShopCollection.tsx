"use client";
import {layouts} from "@/data/shop";
import {useState} from "react";
import Pagination from "@/app/components/Shop/Pagination";
import ProductGrid from "@/app/components/Shop/ProductGrid";
import Sorting from "@/app/components/Shop/Sorting";
import ShopFilter from "@/app/components/Shop/ShopFilter";
import {Product} from "@/types/shopType";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function ShopCollection() {
    const [gridItems, setGridItems] = useState(4);
    const [products, setProducts] = useState<Product[]>([]);
    const [finalSorted, setFinalSorted] = useState("");
    return (
        <>
            <section className="flat-spacing-2">
                <div className="container">
                    <div className="tf-shop-control grid-3 align-items-center">
                        <div className="tf-control-filter">
                            <a
                                href="#filterShop"
                                data-bs-toggle="offcanvas"
                                aria-controls="offcanvasLeft"
                                className="tf-btn-filter"
                            >
                                <span className="icon icon-filter"/>
                                <span className="text">Search</span>
                            </a>
                        </div>

                        <ul className="tf-control-layout d-flex justify-content-center">
                            {layouts.map((layout, index) => (
                                <li
                                    key={index}
                                    className={`tf-view-layout-switch ${layout.className} ${
                                        gridItems == Number(layout.dataValueGrid) ? "active" : ""
                                    }`}
                                    onClick={() => setGridItems(Number(layout.dataValueGrid))}
                                >
                                    <div className="item">
                                        <span className={`icon ${layout.iconClass}`}/>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="tf-control-sorting d-flex justify-content-end">
                            <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
                                <Sorting setFinalSortedAction={setFinalSorted}/>
                            </div>
                        </div>

                    </div>


                    <div className="wrapper-control-shop">
                        <div className="meta-filter-shop"/>
                        <ProductGrid allproducts={products} gridItems={gridItems}/>
                        {/* pagination */}
                        {finalSorted.length ? (
                            <ul className="tf-pagination-wrap tf-pagination-list tf-pagination-btn">
                                <Pagination/>
                            </ul>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </section>
            <ShopFilter setProductsAction={setProducts} sorted={finalSorted}/>
        </>
    )
}