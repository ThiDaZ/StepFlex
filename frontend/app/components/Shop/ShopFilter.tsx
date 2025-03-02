"use client"
import React, {useEffect, useState} from "react";
import Slider from "rc-slider";
import {ShopDataProps, Product} from "@/types/shopType";
import toast from "react-hot-toast";

interface Props {
    sorted: string,
    setProductsAction: (products: Product[]) => void
}

export default function ShopFilter({sorted, setProductsAction}: Props) {

    const [loadData, setLoadData] = useState<ShopDataProps>();

    const [searchInput, setSearchInput] = useState("");
    const [selectedBrands, setSelectedBrands] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [price, setPrice] = useState<number | number[]>([5000, 100000]);

    const formatNumber = (num: number) => {
        return num.toLocaleString('lkr');
    };

    useEffect(() => {
        const onLoad = async () => {
            const response = await fetch("http://localhost:8080/backend/LoadShopData", {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();
            setLoadData(data)
            setProductsAction(data.productList);

            console.log(sorted)

        };
        onLoad();
    }, [setProductsAction]);

    useEffect(() => {
        onSearch();
    }, [selectedBrands, selectedCategory, searchInput, price, sorted]);

    const onSearch = async () => {
        const search_dto = {
            ...(searchInput.length > 3 && {"search": searchInput}),
            ...(selectedBrands !== "" && {"brand": selectedBrands}),
            ...(selectedCategory  !== "" && {"category": selectedCategory}),
            "max_price": Array.isArray(price) ? price[1] : 100000,
            "min_price": Array.isArray(price) ? price[0] : 5000,
            "sort_text": sorted,
        }
        console.log(search_dto)

        const response = await fetch("http://localhost:8080/backend/SearchProducts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(search_dto),
            credentials: "include",
        })

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                setProductsAction(data.productList);
            } else {
                toast.error("Something went wrong");
            }
        } else {
            console.log("Server error");
        }

    }

    const handlePrice = (value: number | number[]) => {
        setPrice(value);
    };

    const clearFilter = () => {
        setSearchInput('')
        setSelectedBrands("");
        setSelectedCategory("")
        setPrice([5000, 100000]);
    };

    return (
        <div className="offcanvas offcanvas-start canvas-filter" id="filterShop">
            <div className="canvas-wrapper">
                <header className="canvas-header">
                    <div className="filter-icon">
                        <span className="icon icon-filter"/>
                        <span>Filter</span>
                    </div>
                    <span
                        className="icon-close icon-close-popup"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    />
                </header>
                <div className="canvas-body">

                    <form
                        onSubmit={(e) => e.preventDefault()}
                        action="#"
                        id="facet-filter-form"
                        className="facet-filter-form"
                    >
                        <div className="tf-field style-1 mb_30">
                            <input
                                className="tf-field-input tf-input"
                                placeholder=" "
                                type="text"
                                id="firstName"
                                required
                                name="first name"
                                value={searchInput || ""}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <label
                                className="tf-field-label fw-4 text_black-2"
                                htmlFor="firstName"
                            >
                                Search
                            </label>
                        </div>
                        <div className="widget-facet">
                            <div
                                className="facet-title"
                                data-bs-target="#category"
                                data-bs-toggle="collapse"
                                aria-expanded="true"
                                aria-controls="category"
                            >
                                <span>Category</span>
                                <span className="icon icon-arrow-up"/>
                            </div>
                            <div id="category" className="collapse show">
                                <ul className="tf-filter-group current-scrollbar mb_36">
                                    {loadData?.categoryList.map((category) => (
                                        <li
                                            key={category.id}
                                            className="list-item d-flex gap-12 align-items-center"
                                        >
                                            <input
                                                type="radio"
                                                className="tf-check"
                                                value={category.name}
                                                checked={selectedCategory === category.name}
                                                onChange={(e) => {
                                                    setSelectedCategory(e.target.value)
                                                }}
                                            />
                                            <label className="label">
                                                <span>{category.name}</span>&nbsp;
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="widget-facet wrap-price">
                            <div
                                className="facet-title"
                                data-bs-target="#price"
                                data-bs-toggle="collapse"
                                aria-expanded="true"
                                aria-controls="price"
                            >
                                <span>Price</span>
                                <span className="icon icon-arrow-up"/>
                            </div>
                            <div id="price" className="collapse show">
                                <div className="widget-price filter-price">
                                    <Slider
                                        // formatLabel={() => ``}
                                        range
                                        max={100000}
                                        min={5000}
                                        defaultValue={price}
                                        onChange={(value) => handlePrice(value)}
                                        id="slider"
                                    />
                                    <div className="box-title-price">
                                        <span className="title-price">Price :</span>
                                        <div className="caption-price">
                                            <div>
                                                <span>LKR</span>
                                                <span
                                                    className="min-price">{Array.isArray(price) ? formatNumber(price[0]) : formatNumber(price)}</span>
                                            </div>
                                            <span>-</span>
                                            <div>
                                                <span>LKR</span>
                                                <span
                                                    className="max-price">{Array.isArray(price) ? formatNumber(price[1]) : formatNumber(price)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="widget-facet">
                            <div
                                className="facet-title"
                                data-bs-target="#brand"
                                data-bs-toggle="collapse"
                                aria-expanded="true"
                                aria-controls="brand"
                            >
                                <span>Brand</span>
                                <span className="icon icon-arrow-up"/>
                            </div>
                            <div id="brand" className="collapse show">
                                <ul className="tf-filter-group current-scrollbar mb_36">
                                    {loadData?.brandList.map((brand) => (
                                        <li
                                            key={brand.Id}
                                            className="list-item d-flex gap-12 align-items-center"
                                        >
                                            <input
                                                type="radio"
                                                className="tf-check"
                                                value={brand.name}
                                                checked={selectedBrands === brand.name}
                                                onChange={(e) => {
                                                    setSelectedBrands(e.target.value)
                                                }}
                                            />
                                            <label className="label">
                                                <span>{brand.name}</span>&nbsp;
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </form>


                    <div className="mt-5"></div>
                    <a className="tf-btn style-2 btn-fill rounded animate-hover-btn"
                       onClick={clearFilter}
                    >
                        Clear Filter
                    </a>

                </div>
            </div>
        </div>
    );
}
