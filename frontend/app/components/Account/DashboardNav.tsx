"use client";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";

const accountLinks = [
    {href: "/my-account-edit", label: "Account Details"},
    {href: "/my-account-orders", label: "Orders"},
    {href: "/my-products", label: "Add Product"},
    {href: "/my-product-list", label: "Products list"},
    {href: "/my-account-address", label: "Addresses"},
    // {href: "/my-account-wishlist", label: "Wishlist"},
];

export default function DashboardNav() {
    const router = useRouter();

    useEffect(() => {
        const sessionCheck = async () => {
            try {
                const response = await fetch("http://localhost:8080/backend/SessionCheck", {
                    method: "GET",
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    if (!data.success) {
                        router.replace("/login");
                    }
                }
            } catch (e) {
                console.log(e)
                router.replace("/login");
            }

        };
        sessionCheck();
    }, [router]);

    const logOut = async () => {
        const response = await fetch("http://localhost:8080/backend/LogOut", {
            method: "GET",
            credentials: "include",
        })
        if (response.ok) {
            window.location.href = "/login";
        } else {
            alert("Error logging out")
        }

    }

    const pathname = usePathname();
    return (
        <ul className="my-account-nav">
            {accountLinks.map((link, index) => (
                <li key={index}>
                    <Link
                        href={link.href}
                        className={`my-account-nav-item ${
                            pathname == link.href ? "active" : ""
                        }`}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
            <li>
                <button className="my-account-nav-item"
                        onClick={logOut}
                >
                    Logout
                </button>
            </li>
        </ul>
    );
}
