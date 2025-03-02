"use client"
import Image from "next/image";
import Link from "next/link";
import {UserCart, District, Province} from "@/types/checkOutTypes";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import Script from "next/script";


export default function Checkout() {

    const imageUrl = "http://localhost:8080/backend/products-images/"
    const image1 = "/image1.png"

    const [cartData, setCartData] = useState<UserCart>()
    const [province, setProvince] = useState<Province[]>([]);
    const [district, setDistrict] = useState<District[]>([]);

    const [defaultAddress, setDefaultAddress] = useState<boolean>(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [provinceId, setProvinceId] = useState('');
    const [districtId, setDistrictId] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');

    const [total, setTotal] = useState(0);



    useEffect(() => {


        const loadDetails = async () => {
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


        const loadData = async () => {
            const response = await fetch('http://localhost:8080/backend/LoadCheckOut', {
                method: 'GET',
                credentials: 'include',
            })
            if (response.ok) {
                const data = await response.json()
                setCartData(data)
                setFirstName(data.user.first_name)
                setLastName(data.user.last_name)
                setEmail(data.user.email)
                setLine1(data.address.line1)
                setLine2(data.address.line2)
                setProvinceId(data.address.district.province.id)
                setDistrictId(data.address.district.id)
                setZipCode(data.address.zipCode)
                setPhone(data.address.mobile)

                const calculatedTotal = cartData?.cartList.reduce((sum, elm) => {
                    return sum + elm.qty * elm.product.price;
                }, 0);

                setTotal(calculatedTotal || 0);

                console.log(calculatedTotal)
            } else {
                console.log("Server error")
            }
        }
        loadDetails();
        loadData();
    }, [])

    // payhere.onCompleted = function onCompleted(orderId) {
    //     console.log("Payment completed. OrderID:" + orderId);
    //     // Note: validate the payment and show success or failure page to the customer
    // };


    const onSubmit = async () => {
        const sendData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            line1: line1,
            line2: line2,
            province: provinceId,
            district: districtId,
            zip_code: zipCode,
            phone: phone,
            default_address: defaultAddress,
        }

        console.log(sendData);

        const response = await fetch('http://localhost:8080/backend/Checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
            credentials: 'include',
        })

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            if (data.success) {
                payhere.startPayment(data.payhereJson);

                toast.success("Order placed successfully")
                window.location.href = "/";
            } else {
                toast.success(data.content.toString())
            }
        }

    }

    return (
        <>
            <Script src="https://www.payhere.lk/lib/payhere.js" strategy="lazyOnload" />
            <section className="flat-spacing-11">
                <div className="container">
                    <div className="tf-page-cart-wrap layout-2">
                        <div className="tf-page-cart-item">
                            <h5 className="fw-5 mb_20">Billing details</h5>
                            <form
                                className="form-checkout"
                            >
                                <div className="box-field text-start">
                                    <div className="box-checkbox fieldset-radio d-flex align-items-center gap-8">
                                        <input
                                            type="checkbox"
                                            id="check-new-address"
                                            className="tf-check"
                                            checked={defaultAddress}
                                            onChange={(e) => setDefaultAddress(e.target.checked)}
                                            style={{marginTop: "-12px"}}
                                        />
                                        <label htmlFor="check-new-address" className="text_black-2 fw-4">
                                            Set as default address.
                                        </label>
                                    </div>
                                </div>
                                <div className="box grid-2">
                                    <fieldset className="fieldset">
                                        <label htmlFor="first-name">First Name</label>
                                        <input
                                            required
                                            type="text"
                                            id="first-name"
                                            value={firstName || ""}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </fieldset>
                                    <fieldset className="fieldset">
                                        <label htmlFor="last-name">Last Name</label>
                                        <input required type="text" id="last-name"
                                               value={lastName || ""}
                                               onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </fieldset>
                                </div>
                                <fieldset className="box fieldset">
                                    <label htmlFor="province">Province</label>
                                    <div className="select-custom">
                                        <select
                                            className="tf-select w-100"
                                            id="province"
                                            name="address[province]"
                                            value={provinceId || ""}
                                            disabled={defaultAddress}
                                            onChange={(e) => setProvinceId(e.target.value)}
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
                                </fieldset>
                                <fieldset className="box fieldset">
                                    <label htmlFor="district">District</label>
                                    <div className="select-custom">
                                        <select
                                            className="tf-select w-100"
                                            id="District"
                                            name="address[district]"
                                            value={districtId || ""}
                                            disabled={defaultAddress}

                                            onChange={(e) => setDistrictId(e.target.value)}
                                        >
                                            <option value="">---</option>
                                            {district.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </fieldset>
                                <fieldset className="box fieldset">
                                    <label htmlFor="city">Postal Code</label>
                                    <input required type="text" id="city" value={zipCode || ""}
                                           disabled={defaultAddress}
                                           onChange={(e) => setZipCode(e.target.value)}/>
                                </fieldset>
                                <fieldset className="box fieldset">
                                    <label htmlFor="address">Address Line 01</label>
                                    <input required type="text" id="address"
                                           value={line1 || ""}
                                           disabled={defaultAddress}
                                           onChange={(e) => setLine1(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="box fieldset">
                                    <label htmlFor="address">Address Line 02</label>
                                    <input required type="text" id="address"
                                           value={line2 || ""}
                                           disabled={defaultAddress}
                                           onChange={(e) => setLine2(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="box fieldset">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input required type="number" id="phone"
                                           value={phone || ""}
                                           disabled={defaultAddress}
                                           onChange={(e) => setPhone(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="box fieldset">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        required
                                        type="email"
                                        autoComplete="abc@xyz.com"
                                        id="email"
                                        value={email || ""}
                                        disabled={true}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </fieldset>
                                {/*<fieldset className="box fieldset">*/}
                                {/*    <label htmlFor="note">Order notes (optional)</label>*/}
                                {/*    <textarea name="note" id="note" defaultValue={""}/>*/}
                                {/*</fieldset>*/}
                            </form>
                        </div>
                        <div className="tf-page-cart-footer">
                            <div className="tf-cart-footer-inner">
                                <h5 className="fw-5 mb_20">Your order</h5>
                                <form
                                    onSubmit={(e) => e.preventDefault()}
                                    className="tf-page-cart-checkout widget-wrap-checkout"
                                >
                                    <ul className="wrap-checkout-product">
                                        {cartData?.cartList.map((elm, i) => (
                                            <li key={i} className="checkout-product-item">
                                                <figure className="img-product">
                                                    <Image
                                                        alt="product"
                                                        src={imageUrl + elm.product.id + image1}
                                                        width={720}
                                                        height={1005}
                                                    />
                                                    <span className="quantity">{elm.qty}</span>
                                                </figure>
                                                <div className="content">
                                                    <div className="info">
                                                        <p className="name">{elm.product.title}</p>
                                                        <span
                                                            className="variant">Size ({elm.product.size?.name || "N/A"})</span>
                                                    </div>
                                                    <span className="price">
                            ${(elm.product.price * elm.qty).toFixed(2)}
                          </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    {!cartData?.cartList.length && (
                                        <div className="container">
                                            <div className="row align-items-center mt-5 mb-5">
                                                <div className="col-12 fs-18">
                                                    Your shop cart is empty
                                                </div>
                                                <div className="col-12 mt-3">
                                                    <Link
                                                        href={`/shop-default`}
                                                        className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                                                        style={{width: "fit-content"}}
                                                    >
                                                        Explore Products!
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="d-flex justify-content-between line pb_20">
                                        <h6 className="fw-5">Total</h6>
                                        <h6 className="total fw-5">LKR.{total.toFixed(2)}</h6>
                                    </div>
                                    <div className="wd-check-payment">

                                        <p className="text_black-2 mb_20">
                                            Your personal data will be used to process your order,
                                            support your experience throughout this website, and for
                                            other purposes described in our
                                            <Link
                                                href={`/privacy-policy`}
                                                className="text-decoration-underline"
                                            >
                                                privacy policy
                                            </Link>
                                            .
                                        </p>
                                        <div className="box-checkbox fieldset-radio mb_20">
                                            <input
                                                required
                                                type="checkbox"
                                                id="check-agree"
                                                className="tf-check"
                                            />
                                            <label htmlFor="check-agree" className="text_black-2">
                                                I have read and agree to the website
                                                <Link
                                                    href={``}
                                                    className="text-decoration-underline"
                                                >
                                                    terms and conditions
                                                </Link>
                                                .
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        className="tf-btn radius-3 btn-fill btn-icon animate-hover-btn justify-content-center"
                                        onClick={onSubmit}

                                        id="payhere-payment"
                                    >

                                        Place order
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
