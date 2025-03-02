"use client"
import Image from "next/image";
import styles from "../logins.module.css";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                    if (data.success) {
                        router.replace("/my-account-edit");
                    }
                }
            } catch (e) {
                console.log(e)
            }

        };
        sessionCheck();
    }, [router]);


    const onSubmit = async () => {

        const user_dto = {
            email: email,
            password: password,
        }

        try {
            const response = await fetch("http://localhost:8080/backend/SignIn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user_dto),
                credentials: 'include',

            });

            if (response.ok) {
                const data = await response.json();
                if (data.content == "Unverified") {
                    router.replace("/verification");
                } else {
                    if (data.success) {
                        toast.success(data.content);
                        router.replace("/");
                    } else {
                        toast.error(data.content);
                    }
                }
            } else {
                toast.error("Login failed.");
            }

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <div className="container-fluid p-0">
                <div className="d-flex p-0">
                    <div className="col-lg-7 col-xl-auto d-none d-lg-block vh-100 p-3">
                        <div
                            className={`d-flex align-items-center pb-2 ${styles.signTag}`}
                            style={{gap: "17px"}}
                        >
                            <Image src="/images/logo/black-circle.png" alt="" width={23} height={23}/>
                            <span className="bold">
                Unlock Rare Kicks, Elevate Your Style.
              </span>
                        </div>
                        <Image
                            src="/images/backgrounds/login-Background.webp"
                            alt=""
                            width={500} height={900}
                            className={styles.signBackgroundImg}
                        />
                    </div>
                    <div className="col col-lg col-xl vh-100 d-flex justify-content-center align-items-center p-5">
                        <div className="d-flex flex-column " style={{gap: "30px"}}>
                            <div
                                className="d-flex align-items-center"
                                style={{gap: "16px"}}
                            >
                                <Image src="/images/logo/StepFlex-86.png" height={86} width={86} alt="logo"/>
                                <a href={"/"}><h1 className="kanitBold">Step Flex</h1></a>
                            </div>
                            <div className="d-flex flex-column" style={{gap: "16px"}}>
                                <span className="fs-3 bold">Login</span>
                                <span className="light-font">
                  Welcome back! Please login to your account.
                </span>
                            </div>

                            <div className="d-flex flex-column" style={{gap: "7px"}}>
                                <label className="fs-6">Email</label>
                                <input className={styles.inputField} type="email" id="email"
                                       onChange={(e) => {
                                           setEmail(e.target.value)
                                       }}/>
                            </div>

                            <div className="d-flex flex-column" style={{gap: "7px"}}>
                                <label className="fs-6">Password</label>
                                <input className={styles.inputField} type="password" id="password"
                                       onChange={(e) => {
                                           setPassword(e.target.value)
                                       }}/>
                            </div>

                            <button className={styles.lgPrBtn} onClick={onSubmit}>Login</button>

                            <div
                                className="d-flex justify-content-center"
                                style={{gap: "11px"}}
                            >
                                <span className="light-font">New user?</span>
                                <a href="/register">Sign up</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
