"use client";

import {useEffect, useState} from "react";
import toast from "react-hot-toast";

interface Province {
    id: number;
    name: string;
}

interface District {
    id: number;
    name: string;
    province: {
        id: number;
        name: string;
    };
}

interface Address {
    id: number;
    line1: string;
    line2: string;
    zipCode: string;
    district: {
        name: string;
        province: {
            name: string;
        };
    };
    mobile: string;
}

export default function AccountAddress() {
    const [activeEdit, setactiveEdit] = useState(false);
    const [activeAdd, setactiveAdd] = useState(false);
    const [addressList, setAddressList] = useState<Address[]>([]);

    const [province, setProvince] = useState<Province[]>([]);
    const [district, setDistrict] = useState<District[]>([]);
    const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);

    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [provinceId, setProvinceId] = useState('');
    const [districtId, setDistrictId] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    // const [isDefault, setIsDefault] = useState(false);

    const loadAddress = async () => {
        const response = await fetch('http://localhost:8080/backend/LoadAddress', {
            method: 'GET',
            credentials: 'include',
        })

        if (response.ok) {
            const data = await response.json();
            setAddressList(data.addressList);
            console.log(data.addressList[0]);
        } else {
            console.log('Server error');
        }
    }

    useEffect(() => {
        const lodaData = async () => {
            const response = await fetch('http://localhost:8080/backend/LoadAddressDetails', {
                method: 'GET',
                credentials: 'include',
            })

            if (response.ok) {
                const data = await response.json();
                setDistrict(data.districtList);
                setProvince(data.provinceList);
                console.log(data);
            } else {
                console.log('Server error');
            }

        }
        loadAddress();
        lodaData();
    }, [])

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProvinceId = e.target.value;
        setProvinceId(selectedProvinceId);

        // Filter districts based on the selected province
        const filtered = district.filter(d => d.province.id.toString() === selectedProvinceId);
        setFilteredDistricts(filtered);
    };

    const addAddress = async () => {
        const address_DTO = {
            line1: line1,
            line2: line2,
            province: provinceId,
            district: districtId,
            zipCode: zipCode,
            phone: phone,
            // is_default: isDefault,
        }

        const response = await fetch("http://localhost:8080/backend/AddAddress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(address_DTO),
            credentials: "include",
        })

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                toast.success("Address has been added successfully.")
                loadAddress();
                setLine1("");
                setLine2("");
                setProvinceId("");
                setDistrictId("");
                setZipCode("");
                setPhone("");
                setactiveEdit(false);
            } else {
                toast.error(data.content.toString())
            }
        } else {
            toast.error("something went wrong. Please try again later.")
        }

    }

    return (
        <div className="my-account-content account-address">
            <div className="text-center widget-inner-address">
                <button
                    className="tf-btn btn-fill animate-hover-btn btn-address mb_20"
                    onClick={() => setactiveEdit(true)}
                >
                    Add a new address
                </button>
                <form
                    className="show-form-address wd-form-address"
                    id="formnewAddress"
                    // onSubmit={(e) => e.preventDefault()}
                    style={activeEdit ? {display: "block"} : {display: "none"}}
                >
                    <div className="title">Add a new address</div>
                    <div className="box-field">
                        <div className="tf-field style-1">
                            <input
                                className="tf-field-input tf-input"
                                placeholder=" "
                                type="text"
                                id="addressLine1"
                                name="addressLine1"
                                value={line1 || ""}
                                onChange={(e) => setLine1(e.target.value)}
                            />
                            <label
                                className="tf-field-label fw-4 text_black-2"
                                htmlFor="addressLine1"
                            >
                                Address Line 01
                            </label>
                        </div>
                    </div>
                    <div className="box-field">
                        <div className="tf-field style-1">
                            <input
                                className="tf-field-input tf-input"
                                placeholder=" "
                                type="text"
                                id="addressLine2"
                                name="addressLine2"
                                value={line2 || ""}
                                onChange={(e) => setLine2(e.target.value)}
                            />
                            <label
                                className="tf-field-label fw-4 text_black-2"
                                htmlFor="addressLine2"
                            >
                                Address Line 02
                            </label>
                        </div>
                    </div>
                    <div className="box-field">
                        <label
                            htmlFor="countryEdit"
                            className="mb_10 fw-4 text-start d-block text_black-2"
                        >
                            Province
                        </label>
                        <div className="select-custom">
                            <select
                                className="tf-select w-100"
                                id="province"
                                name="address[province]"
                                value={provinceId}
                                onChange={handleProvinceChange}
                            >
                                <option value="---">
                                    ---
                                </option>
                                {province.map((item) => (
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
                    <div className="box-field">
                        <label
                            htmlFor="district"
                            className="mb_10 fw-4 text-start d-block text_black-2"
                        >
                            District
                        </label>
                        <div className="select-custom">
                            <select
                                className="tf-select w-100"
                                id="district"
                                name="address[district]"
                                value={districtId}
                                onChange={(e) => setDistrictId(e.target.value)}
                            >
                                <option value="">---</option>
                                {filteredDistricts.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="box-field">
                        <div className="tf-field style-1">
                            <input
                                className="tf-field-input tf-input"
                                placeholder=" "
                                type="text"
                                id="AddressZipNew"
                                name="AddressZipNew"
                                value={zipCode || ""}
                                onChange={(e) => setZipCode(e.target.value)}
                            />
                            <label
                                className="tf-field-label fw-4 text_black-2"
                                htmlFor="AddressZipNew"
                            >
                                Postal/ZIP code
                            </label>
                        </div>
                    </div>
                    <div className="box-field">
                        <div className="tf-field style-1">
                            <input
                                className="tf-field-input tf-input"
                                placeholder=" "
                                type="text"
                                id="phone"
                                name="phone"
                                value={phone || ""}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <label
                                className="tf-field-label fw-4 text_black-2"
                                htmlFor="phone"
                            >
                                Phone
                            </label>
                        </div>
                    </div>
                    <div className="box-field text-start">
                        <div className="box-checkbox fieldset-radio d-flex align-items-center gap-8">
                            <input
                                type="checkbox"
                                id="check-new-address"
                                className="tf-check"
                            />
                            <label htmlFor="check-new-address" className="text_black-2 fw-4">
                                Set as default address.
                            </label>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-20">
                        <button type="button" className="tf-btn btn-fill animate-hover-btn"
                                onClick={addAddress}
                        >
                            Add address
                        </button>
                        <span
                            className="tf-btn btn-fill animate-hover-btn btn-hide-address"
                            onClick={() => setactiveEdit(false)}
                        >
              Cancel
            </span>
                    </div>
                </form>

                {addressList.map((item) => (
                    <div className="address-item" key={item.id}>
                        <h6 className="mb_20">Default</h6>
                        <p>{item.line1}</p>
                        {item.line2 && <p>{item.line2}</p>}
                        <p>{item.district.name}</p>
                        <p>{item.district.province.name}</p>
                        <p>{item.zipCode}</p>
                        <p className="mb_10">{item.mobile}</p>
                        {/*<div className="d-flex gap-10 justify-content-center">*/}
                        {/*    <button*/}
                        {/*        className="tf-btn btn-fill animate-hover-btn justify-content-center btn-edit-address"*/}
                        {/*        onClick={() => setactiveAdd(true)}*/}
                        {/*    >*/}
                        {/*        <span>Edit</span>*/}
                        {/*    </button>*/}
                        {/*    <button className="tf-btn btn-outline animate-hover-btn justify-content-center">*/}
                        {/*        <span>Delete</span>*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>
                ))}


                <form
                    className="edit-form-address wd-form-address"
                    id="formeditAddress"
                    onSubmit={(e) => e.preventDefault()}
                    style={activeAdd ? {display: "block"} : {display: "none"}}
                >
                    <div className="title">Edit address</div>
                    <div className="box-field">
                        <div className="tf-field style-1">
                            <input
                                className="tf-field-input tf-input"
                                placeholder=" "
                                type="text"
                                id="addressLine1"
                                name="addressLine1"
                            />
                            <label
                                className="tf-field-label fw-4 text_black-2"
                                htmlFor="addressLine1"
                            >
                                Address Line 01
                            </label>
                        </div>
                    </div>
                    <div className="box-field">
                        <div className="tf-field style-1">
                            <input
                                className="tf-field-input tf-input"
                                placeholder=" "
                                type="text"
                                id="addressLine2"
                                name="addressLine2"
                            />
                            <label
                                className="tf-field-label fw-4 text_black-2"
                                htmlFor="addressLine2"
                            >
                                Address Line 02
                            </label>
                        </div>
                    </div>
                    <div className="box-field">
                        <label
                            htmlFor="countryEdit"
                            className="mb_10 fw-4 text-start d-block text_black-2"
                        >
                            Province
                        </label>
                        <div className="select-custom">
                            <select
                                className="tf-select w-100"
                                id="province"
                                name="address[province]"
                                data-default=""
                            >
                                <option value="---">
                                    ---
                                </option>
                                <option
                                    value="Australia"
                                >
                                    Australia
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="box-field">
                        <label
                            htmlFor="countryEdit"
                            className="mb_10 fw-4 text-start d-block text_black-2"
                        >
                            District
                        </label>
                        <div className="select-custom">
                            <select
                                className="tf-select w-100"
                                id="districtEdit"
                                name="address[district]"

                            >
                                <option value="---">
                                    ---
                                </option>
                                <option
                                    value="Australia"
                                >
                                    Australia
                                </option>

                            </select>
                        </div>
                    </div>

                    <div className="box-field">
                        <div className="tf-field style-1">
                            <input
                                className="tf-field-input tf-input"
                                placeholder=" "
                                type="text"
                                id="AddressZipNew"
                                name="AddressZipNew"
                            />
                            <label
                                className="tf-field-label fw-4 text_black-2"
                                htmlFor="AddressZipNew"
                            >
                                Postal/ZIP code
                            </label>
                        </div>
                    </div>
                    <div className="box-field">
                        <div className="tf-field style-1">
                            <input
                                className="tf-field-input tf-input"
                                placeholder=" "
                                type="text"
                                id="phone"
                                name="phone"
                            />
                            <label
                                className="tf-field-label fw-4 text_black-2"
                                htmlFor="phone"
                            >
                                Phone
                            </label>
                        </div>
                    </div>
                    <div className="box-field text-start">
                        <div className="box-checkbox fieldset-radio d-flex align-items-center gap-8">
                            <input
                                type="checkbox"
                                id="check-edit-address"
                                className="tf-check"
                            />
                            <label htmlFor="check-edit-address" className="text_black-2 fw-4">
                                Set as default address.
                            </label>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-20">
                        <button type="button" className="tf-btn btn-fill animate-hover-btn">
                            Update address
                        </button>
                        <span
                            className="tf-btn btn-fill animate-hover-btn btn-hide-edit-address"
                            onClick={() => setactiveAdd(false)}
                        >
              Cancel
            </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
