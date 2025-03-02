"use client";
import React, {useEffect, useState} from "react";
import {categoryProps} from "@/types/detailsTypes";
import toast from "react-hot-toast";

interface sizeProps {
    id: number;
    name: string;
    category: categoryProps;
}

interface SizeProps {
    size: sizeProps[];
    onAddSizeAction: (newSize: { id: number; size: string; quantity: number }) => void;
}

export default function SizeAddModal({size, onAddSizeAction}: SizeProps) {
    const [selectSize, setSelectSize] = useState<string | undefined>("---");
    const [quantity, setQuantity] = useState(0);

    const handleAddSize = () => {


        if (!selectSize || selectSize === "---") {
            toast.error("Please select a size");
            return;
        }
        if (!quantity || quantity <= 0) {
            toast.error("Please enter a valid quantity");
            return;
        }

        const size = selectSize?.split("-");

        // console.log("id:", size[0], "size:", size[1]);

        onAddSizeAction(
            {
                id: Number(size[0]),
                size: size[1],
                quantity: quantity
            }
        )

        setSelectSize("---");
        setQuantity(1);

        // const modalElement = document.getElementById(`sizeAddModal`);
        // if (modalElement) {
        //     const modalInstance = new window.bootstrap.Modal(modalElement);
        //     modalInstance.hide();
        // }

    }

    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);

    return (
        <div
            className="modal modalCentered fade form-sign-in modal-part-content"
            id="sizeAddModal"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="header">
                        <div className="demo-title">Add Size</div>
                        <span
                            className="icon-close icon-close-popup"
                            data-bs-dismiss="modal"
                        />
                    </div>
                    <div className="tf-field mb_30">
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
                                {size.map((item: sizeProps) => (
                                    <option
                                        key={item.id}
                                        value={item.id + "-" + item.name}
                                    >
                                        {item.name}
                                    </option>
                                ))}

                            </select>
                        </div>
                        <div className="tf-field style-1">
                            <input
                                className="tf-field-input tf-input"
                                type="number"
                                name=""
                                value={quantity ?? ""}
                                onChange={(e) => {
                                    setQuantity(Number(e.target.value));
                                }}
                            />
                            <label className="tf-field-label" htmlFor="">
                                Quantity
                            </label>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="w-100">
                            <div className="w-100">
                                <button
                                    onClick={handleAddSize}
                                    data-bs-dismiss="sizeAddModal"
                                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                                >
                                    <span>Add Size</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
