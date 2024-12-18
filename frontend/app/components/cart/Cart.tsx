"use client";
import Image from "next/image";
import Link from "next/link";
import {cartProducts} from "@/data/cart";
import {useEffect, useState} from "react";
import {CartItems} from "@/types/cartItemsTypes";
import toast from "react-hot-toast";

export default function Cart() {
    const [cartList, setCartList] = useState<CartItems[]>([]);
    const imageUrl = "http://localhost:8080/backend/products-images/"
    const image1 = "/image1.png"

    const [total, setTotal] = useState(0);

    const loadData = async () => {

        const response = await fetch("http://localhost:8080/backend/LoadCart", {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            setCartList(data);
            console.log(data[0])
        } else {
            console.log("Server Error");
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const onRemove = async ({id}: { id: number }) => {
        // console.log(id);
        const response = await fetch(`http://localhost:8080/backend/RemoveCartItem?id=${id}`, {
            method: "GET",
            credentials: "include",
        })

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                toast.success(data.content);
                loadData();
            } else {
                toast.error(data.content);
            }
        } else {
            console.log("Server Error");
        }

    }

    const addQty = async ({id}: { id: number }) => {
        const response = await fetch(`http://localhost:8080/backend/AddCartQty?id=${id}&qty=1`, {
            method: "GET",
            credentials: "include",
        })

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                toast.success(data.content);
                loadData();
            } else {
                toast.error(data.content);
            }
        } else {
            console.log("Server Error");
        }
    }

    const removeQty = async ({id}: { id: number }) => {
        const response = await fetch(`http://localhost:8080/backend/RemoveCartQty?id=${id}&qty=1`, {
            method: "GET",
            credentials: "include",
        })

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                toast.success(data.content);
                loadData();
            } else {
                toast.error(data.content);
            }
        } else {
            console.log("Server Error");
        }
    }

    useEffect(() => {
        const subtotal = cartList.reduce(
            (sum, item) => sum + item.product.price * item.qty,
            0
        );
        setTotal(subtotal);
    }, [cartList]);

    return (
        <>
            <section className="flat-spacing-11">
                <div className="container">
                    <div className="tf-page-cart-wrap">
                        <div className="tf-page-cart-item">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <table className="tf-table-page-cart">
                                    <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cartList.map((elm, i) => (
                                        <tr key={i} className="tf-cart-item file-delete">
                                            <td className="tf-cart-item_product">
                                                <Link
                                                    href={`/product-details/${elm.product.id}`}
                                                    className="img-box"
                                                >
                                                    <Image
                                                        alt="img-product"
                                                        src={imageUrl + elm.product.id + image1}
                                                        width={668}
                                                        height={932}
                                                    />
                                                </Link>
                                                <div className="cart-info">
                                                    <Link
                                                        href={`/product-detail/${elm.product.id}`}
                                                        className="cart-title link"
                                                    >
                                                        {elm.product.title}
                                                    </Link>
                                                    <div className="cart-meta-variant">Size
                                                        - {elm.product.size.name}</div>
                                                    <span
                                                        className="remove-cart link remove"
                                                        onClick={() => onRemove({id: elm.product.id})}
                                                    >
                              Remove
                            </span>
                                                </div>
                                            </td>
                                            <td
                                                className="tf-cart-item_price"
                                                cart-data-title="Price"
                                            >
                                                <div className="cart-price" >
                                                    LKR {elm.product.price}
                                                </div>
                                            </td>
                                            <td
                                                className="tf-cart-item_quantity"
                                                cart-data-title="Quantity"
                                            >
                                                <div className="cart-quantity">
                                                    <div className="wg-quantity">
                              <span
                                  className="btn-quantity minus-btn"
                                  onClick={() => removeQty({id: elm.product.id})}
                              >
                                <svg
                                    className="d-inline-block"
                                    width={9}
                                    height={1}
                                    viewBox="0 0 9 1"
                                    fill="currentColor"
                                >
                                  <path d="M9 1H5.14286H3.85714H0V1.50201e-05H3.85714L5.14286 0L9 1.50201e-05V1Z"/>
                                </svg>
                              </span>
                                                        <input
                                                            type="text"
                                                            name="number"
                                                            value={elm.qty}
                                                            min={1}
                                                            disabled={true}
                                                            // onChange={addQty}
                                                        />
                                                        <span
                                                            className="btn-quantity plus-btn"
                                                            onClick={() => addQty({id: elm.product.id})}
                                                        >
                                <svg
                                    className="d-inline-block"
                                    width={9}
                                    height={9}
                                    viewBox="0 0 9 9"
                                    fill="currentColor"
                                >
                                  <path
                                      d="M9 5.14286H5.14286V9H3.85714V5.14286H0V3.85714H3.85714V0H5.14286V3.85714H9V5.14286Z"/>
                                </svg>
                              </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td
                                                className="tf-cart-item_total"
                                                cart-data-title="Total"
                                            >
                                                <div
                                                    className="cart-total"
                                                    style={{minWidth: "60px"}}
                                                    onChange={()=>{
                                                        setTotal((prevTotal) => prevTotal + elm.product.price * elm.qty);

                                                    }}
                                                >
                                                    LKR {(elm.product.price * elm.qty).toFixed(2)}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                {!cartProducts.length && (
                                    <>
                                        <div className="row align-items-center mb-5">
                                            <div className="col-6 fs-18">Your shop cart is empty</div>
                                            <div className="col-6">
                                                <Link
                                                    href={`/shop-default`}
                                                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                                                    style={{width: "fit-content"}}
                                                >
                                                    Explore Products!
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="tf-page-cart-note">
                                    <label htmlFor="cart-note">Add Order Note</label>
                                    <textarea
                                        name="note"
                                        id="cart-note"
                                        placeholder="How can we help you?"
                                        defaultValue={""}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="tf-page-cart-footer">
                            <div className="tf-cart-footer-inner">
                                <div className="tf-page-cart-checkout">
                                    <div className="tf-cart-totals-discounts">
                                        <h3>Subtotal</h3>
                                        <span className="total-value">LKR {total.toFixed(2)}</span>
                                    </div>
                                    <p className="tf-cart-tax">
                                        Taxes and
                                        <Link href={`/shipping-delivery`}>shipping</Link> calculated
                                        at checkout
                                    </p>
                                    <div className="cart-checkbox">
                                        <input
                                            type="checkbox"
                                            className="tf-check"
                                            id="check-agree"
                                        />
                                        <label htmlFor="check-agree" className="fw-4">
                                            I agree with the
                                            <Link href={`/terms-conditions`}>
                                                terms and conditions
                                            </Link>
                                        </label>
                                    </div>
                                    <div className="cart-checkout-btn">
                                        <Link
                                            href={`/checkout`}
                                            className="tf-btn w-100 btn-fill animate-hover-btn radius-3 justify-content-center"
                                        >
                                            <span>Check out</span>
                                        </Link>
                                    </div>
                                    <div className="tf-page-cart_imgtrust">
                                        <p className="text-center fw-6">Guarantee Safe Checkout</p>
                                        <div className="cart-list-social">
                                            <div className="payment-item">
                                                <svg
                                                    viewBox="0 0 38 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    role="img"
                                                    width={38}
                                                    height={24}
                                                    aria-labelledby="pi-visa"
                                                >
                                                    <title id="pi-visa">Visa</title>
                                                    <path
                                                        opacity=".07"
                                                        d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                                                    />
                                                    <path
                                                        fill="#fff"
                                                        d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                                                    />
                                                    <path
                                                        d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                                                        fill="#142688"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="payment-item">
                                                <svg
                                                    viewBox="0 0 38 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={38}
                                                    height={24}
                                                    role="img"
                                                    aria-labelledby="pi-paypal"
                                                >
                                                    <title id="pi-paypal">PayPal</title>
                                                    <path
                                                        opacity=".07"
                                                        d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                                                    />
                                                    <path
                                                        fill="#fff"
                                                        d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                                                    />
                                                    <path
                                                        fill="#003087"
                                                        d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"
                                                    />
                                                    <path
                                                        fill="#3086C8"
                                                        d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"
                                                    />
                                                    <path
                                                        fill="#012169"
                                                        d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="payment-item">
                                                <svg
                                                    viewBox="0 0 38 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    role="img"
                                                    width={38}
                                                    height={24}
                                                    aria-labelledby="pi-master"
                                                >
                                                    <title id="pi-master">Mastercard</title>
                                                    <path
                                                        opacity=".07"
                                                        d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                                                    />
                                                    <path
                                                        fill="#fff"
                                                        d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                                                    />
                                                    <circle fill="#EB001B" cx={15} cy={12} r={7}/>
                                                    <circle fill="#F79E1B" cx={23} cy={12} r={7}/>
                                                    <path
                                                        fill="#FF5F00"
                                                        d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="payment-item">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    role="img"
                                                    aria-labelledby="pi-american_express"
                                                    viewBox="0 0 38 24"
                                                    width={38}
                                                    height={24}
                                                >
                                                    <title id="pi-american_express">
                                                        American Express
                                                    </title>
                                                    <path
                                                        fill="#000"
                                                        d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z"
                                                        opacity=".07"
                                                    />
                                                    <path
                                                        fill="#006FCF"
                                                        d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z"
                                                    />
                                                    <path
                                                        fill="#FFF"
                                                        d="M22.012 19.936v-8.421L37 11.528v2.326l-1.732 1.852L37 17.573v2.375h-2.766l-1.47-1.622-1.46 1.628-9.292-.02Z"
                                                    />
                                                    <path
                                                        fill="#006FCF"
                                                        d="M23.013 19.012v-6.57h5.572v1.513h-3.768v1.028h3.678v1.488h-3.678v1.01h3.768v1.531h-5.572Z"
                                                    />
                                                    <path
                                                        fill="#006FCF"
                                                        d="m28.557 19.012 3.083-3.289-3.083-3.282h2.386l1.884 2.083 1.89-2.082H37v.051l-3.017 3.23L37 18.92v.093h-2.307l-1.917-2.103-1.898 2.104h-2.321Z"
                                                    />
                                                    <path
                                                        fill="#FFF"
                                                        d="M22.71 4.04h3.614l1.269 2.881V4.04h4.46l.77 2.159.771-2.159H37v8.421H19l3.71-8.421Z"
                                                    />
                                                    <path
                                                        fill="#006FCF"
                                                        d="m23.395 4.955-2.916 6.566h2l.55-1.315h2.98l.55 1.315h2.05l-2.904-6.566h-2.31Zm.25 3.777.875-2.09.873 2.09h-1.748Z"
                                                    />
                                                    <path
                                                        fill="#006FCF"
                                                        d="M28.581 11.52V4.953l2.811.01L32.84 9l1.456-4.046H37v6.565l-1.74.016v-4.51l-1.644 4.494h-1.59L30.35 7.01v4.51h-1.768Z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="payment-item">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    role="img"
                                                    viewBox="0 0 38 24"
                                                    width={38}
                                                    height={24}
                                                    aria-labelledby="pi-amazon"
                                                >
                                                    <title id="pi-amazon">Amazon</title>
                                                    <path
                                                        d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                                                        fill="#000"
                                                        fillRule="nonzero"
                                                        opacity=".07"
                                                    />
                                                    <path
                                                        d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                                                        fill="#FFF"
                                                        fillRule="nonzero"
                                                    />
                                                    <path
                                                        d="M25.26 16.23c-1.697 1.48-4.157 2.27-6.275 2.27-2.97 0-5.644-1.3-7.666-3.463-.16-.17-.018-.402.173-.27 2.183 1.504 4.882 2.408 7.67 2.408 1.88 0 3.95-.46 5.85-1.416.288-.145.53.222.248.47v.001zm.706-.957c-.216-.328-1.434-.155-1.98-.078-.167.024-.193-.148-.043-.27.97-.81 2.562-.576 2.748-.305.187.272-.047 2.16-.96 3.063-.14.138-.272.064-.21-.12.205-.604.664-1.96.446-2.29h-.001z"
                                                        fill="#F90"
                                                        fillRule="nonzero"
                                                    />
                                                    <path
                                                        d="M21.814 15.291c-.574-.498-.676-.73-.993-1.205-.947 1.012-1.618 1.315-2.85 1.315-1.453 0-2.587-.938-2.587-2.818 0-1.467.762-2.467 1.844-2.955.94-.433 2.25-.51 3.25-.628v-.235c0-.43.033-.94-.208-1.31-.212-.333-.616-.47-.97-.47-.66 0-1.25.353-1.392 1.085-.03.163-.144.323-.3.33l-1.677-.187c-.14-.033-.296-.153-.257-.38.386-2.125 2.223-2.766 3.867-2.766.84 0 1.94.234 2.604.9.842.82.762 1.918.762 3.11v2.818c0 .847.335 1.22.65 1.676.113.164.138.36-.003.482-.353.308-.98.88-1.326 1.2a.367.367 0 0 1-.414.038zm-1.659-2.533c.34-.626.323-1.214.323-1.918v-.392c-1.25 0-2.57.28-2.57 1.82 0 .782.386 1.31 1.05 1.31.487 0 .922-.312 1.197-.82z"
                                                        fill="#221F1F"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
