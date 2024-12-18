"use client"

import React, {useEffect, useState} from "react";
// import SizeAddModal from "@/app/components/modals/sizeAddModal";
import {brandProps, sizeProps, categoryProps} from "@/types/detailsTypes"
import toast from "react-hot-toast";

export default function Product() {

    const [categoryList, setCategoryList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [menSizeList, setMenSizeList] = useState([]);
    const [womenSizeList, setWomenSizeList] = useState([]);
    const [kidsSizeList, setKidsSizeList] = useState([]);
    const [dynamicSizeList, setDynamicSizeList] = useState<sizeProps[]>([]);

    const [selectCategory, setSelectCategory] = useState<string>("---");
    const [selectBrand, setSelectBrand] = useState<string>("---");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [selectSize, setSelectSize] = useState<string | undefined>("---");
    const [quantity, setQuantity] = useState(0);
    // const [addSize, setAddSize] = useState<sizeProps[]>([])

    const [images, setImages] = useState<File[]>([]);

    //Load details
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch("/api/account/details");
                if (response.ok) {
                    const data = await response.json();
                    setCategoryList(data.categoryList);
                    setBrandList(data.brandList);
                    setMenSizeList(data.menSizeList);
                    setWomenSizeList(data.womenSizeList);
                    setKidsSizeList(data.kidsSizeList);
                }
            } catch (e) {
                console.error(e);
            }
        }
        loadData();
    }, []);


    const onSubmit = async () => {

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price.toString());
        formData.append("category", selectCategory || "");
        formData.append("brand", selectBrand || "");
        formData.append("size", selectSize || "");
        formData.append("quantity", quantity.toString());
        // formData.append("sizeData", JSON.stringify(addSize));


        // if (addSize.length === 0) {
        //     toast.error("Please add at least one size.");
        //     return;
        // } else {
        //     addSize.forEach((size, index) => {
        //         formData.append("size-" + index, size.size.toString());
        //         formData.append("quantity-" + index, size.quantity.toString());
        //     })
        // }

        if (images.length === 0) {
            toast.error("Please upload at least one image.");
            return;
        } else {
            images.forEach((image, index) => {
                formData.append("images" + index, image);
            })
        }

        console.log("FormData entries:");
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        const response = await fetch("http://localhost:8080/backend/ProductListing", {
            method: "POST",
            body: formData,
            credentials: "include",
        })

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                toast.success("Product created successfully.");

                setTitle("");
                setDescription("");
                setPrice(0);
                setQuantity(0);
                setSelectCategory("");
                setSelectBrand("");
                setImages([]);

            } else {
                toast.error("Failed to create product.");
                console.log("error: ", data.content)
            }
        } else {
            toast.error("Failed to create product.");
        }
    }

    //image handle
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const newImages = Array.from(event.target.files);
        const totalImages = [...images, ...newImages];

        if (totalImages.length > 5) {
            alert("You can only upload up to 4 images.");
            return;
        }
        setImages(totalImages);
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    //size handle
    function getSizeList(categoryId?: string) {
        switch (categoryId) {
            case "1": //men = 1
                return menSizeList;
            case "2":// women = 2
                return womenSizeList;
            case "3":// kids = 3
                return kidsSizeList;
            default:
                return [];
        }
    }

    // const handleAddSizeFromModal = (newSize: sizeProps) => {
    //     setAddSize((prevSizes) => [...prevSizes, newSize]);
    // };

    // const removeSize = (id: number) => {
    //     setAddSize((prevAddSize) => prevAddSize.filter((item) => item.id !== id));
    // };

    return (
        <div className="my-account-content account-dashboard">
            <div className="mb_60">
                <h5 className="fw-5 mb_20">Create New Product</h5>
                <div className="box-field grid-2-lg mb_15">
                    <div className="box-field style-1 mb_15">
                        <label
                            htmlFor="brand"
                            className="mb_10 fw-4 text-start d-block text_black-2 "
                        >
                            Brand
                        </label>
                        <div className="select-custom">
                            <select
                                className="tf-select w-100"
                                id="brand"
                                data-default={selectBrand}
                                onChange={(e) => {
                                    setSelectBrand(e.target.value);
                                }}
                            >
                                <option value="---">
                                    ---
                                </option>
                                {brandList.map((item: brandProps) => (
                                    <option
                                        key={item.Id}
                                        value={item.Id}
                                    >
                                        {item.name}
                                    </option>
                                ))}

                            </select>
                        </div>
                    </div>
                    <div className="box-field style-1 mb_15">
                        <label
                            htmlFor="category"
                            className="mb_10 fw-4 text-start d-block text_black-2 "
                        >
                            Category
                        </label>
                        <div className="select-custom">
                            <select
                                className="tf-select w-100"
                                id="category"
                                data-default={selectCategory}
                                onChange={(e) => {
                                    setSelectCategory(e.target.value);
                                    setDynamicSizeList(getSizeList(e.target.value));

                                }}
                            >
                                <option value="---" key="default-category">
                                    ---
                                </option>
                                {categoryList.map((item: categoryProps) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.name}
                                    </option>
                                ))}

                            </select>
                        </div>
                    </div>

                </div>
                <div className="tf-field style-1 mb_15">
                    <input
                        className="tf-field-input tf-input"
                        placeholder=" "
                        type="text"
                        id="title"
                        required
                        name="Title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <label
                        className="tf-field-label fw-4 text_black-2"
                        htmlFor="title"
                    >
                        Title
                    </label>
                </div>
                <div className="tf-field style-1 mb_15">
                    <textarea
                        className="tf-field-input tf-area"
                        placeholder=" "
                        id="description"
                        required
                        name="Description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    <label
                        className="tf-field-label fw-4 text_black-2"
                        style={{top: "15%"}}
                        htmlFor="description"
                    >
                        Description
                    </label>
                </div>
                <div className={"grid-2-lg mb_15"}>
                    <div className="tf-field style-1 mb_15">
                        <input
                            className="tf-field-input tf-input"
                            placeholder=""
                            type="number"
                            id="price"
                            required
                            value={price}
                            name="Title"
                            onChange={(e) => {
                                setPrice(Number(e.target.value));
                            }}
                        />
                        <label
                            className="tf-field-label fw-4 text_black-2"
                            htmlFor="price"
                        >
                            Price (LKR)
                        </label>
                    </div>
                    <div className="tf-field style-1">
                        <input
                            className="tf-field-input tf-input"
                            type="number"
                            name=""
                            value={quantity ?? ""}
                            onChange={(e) => {
                                setQuantity?.(Number(e.target.value));
                            }}
                        />
                        <label className="tf-field-label" htmlFor="">
                            Quantity
                        </label>
                    </div>
                </div>


                <div className="select-custom mb_15">
                    <label
                        htmlFor="size"
                        className="mb_10 fw-4 text-start d-block text_black-2 "
                    >
                        Size
                    </label>
                    <select
                        className="tf-select w-100"
                        id="size"
                        value={selectSize}
                        onChange={(e) => {
                            setSelectSize(e.target.value);
                        }}
                    >
                        <option value="---" key="default-brand">
                            ---
                        </option>
                        {dynamicSizeList.map((item: sizeProps) => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.name}
                            </option>
                        ))}

                    </select>
                </div>

                {/*<div className="my-account-content account-order mb_10">*/}
                {/*    <div className="wrap-account-order">*/}
                {/*        <table>*/}
                {/*            <thead>*/}
                {/*            <tr>*/}
                {/*                <th className="fw-6">Size (EU Standards)</th>*/}
                {/*                <th className="fw-6">Quantity</th>*/}
                {/*                <th className="fw-6">Actions</th>*/}
                {/*            </tr>*/}
                {/*            </thead>*/}
                {/*            <tbody>*/}
                {/*            {*/}
                {/*                addSize.map((product: sizeProps) => (*/}
                {/*                    <tr key={product.id} className="tf-order-item">*/}
                {/*                        <td>{product.size}</td>*/}
                {/*                        <td>{product.quantity}</td>*/}

                {/*                        <td>*/}
                {/*                            <button*/}
                {/*                                className="tf-btn btn-fill animate-hover-btn rounded-0 justify-content-center"*/}
                {/*                                onClick={() => removeSize(product.id)}*/}
                {/*                            >*/}
                {/*                                <span>Remove</span>*/}
                {/*                            </button>*/}


                {/*                        </td>*/}
                {/*                    </tr>*/}
                {/*                ))*/}
                {/*            }*/}

                {/*            <tr className="tf-order-item ">*/}
                {/*                <td>*/}
                {/*                    <button*/}
                {/*                        data-bs-toggle="modal"*/}
                {/*                        data-bs-target={`#sizeAddModal`}*/}
                {/*                        className=" tf-btn btn-fill animate-hover-btn rounded-0 justify-content-center"*/}
                {/*                    >*/}
                {/*                        Add Size*/}
                {/*                    </button>*/}
                {/*                </td>*/}

                {/*            </tr>*/}
                {/*            </tbody>*/}
                {/*        </table>*/}
                {/*        <SizeAddModal*/}
                {/*            size={getSizeList()}*/}
                {/*            onAddSizeAction={*/}
                {/*                (newSize) => handleAddSizeFromModal({*/}
                {/*                    ...newSize,*/}
                {/*                    size: Number(newSize.size)*/}
                {/*                })}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div>
                    <div className="mb-3">
                        <input
                            type="file"
                            className="form-control"
                            style={{borderRadius: 0}}
                            accept="image/png"
                            multiple
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="d-flex flex-wrap gap-3 mb_20">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="position-relative"
                                style={{width: "100px", height: "100px"}}
                            >
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`preview-${index}`}
                                    className="img-thumbnail"
                                    style={{width: "100%", height: "100%", objectFit: "cover"}}
                                />
                                <button
                                    type="button"
                                    className="btn-close position-absolute top-0 end-0"
                                    aria-label="Remove"
                                    onClick={() => removeImage(index)}
                                ></button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-100">
                    <button
                        className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                        onClick={onSubmit}
                    >
                        <span>Add Product</span>
                    </button>

                </div>
            </div>
        </div>
    );
}
