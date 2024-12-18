"use client"
import Image from "next/image";
import styles from "../logins.module.css";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Login() {
    const [verification, setVerification] = useState("");
    const router = useRouter();

    useEffect(() => {
        const sessionCheck = async () => {
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
        };
        sessionCheck();
    }, [router]);

    const onSubmit = async () => {
        const user_dto = {
            verification: verification,
        }

        try {
            const response = await fetch("http://localhost:8080/backend/Verification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user_dto),
                credentials: 'include',

            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    toast.success(data.content);
                    router.push("/");
                } else {
                    toast.error(data.content);
                }
            } else {
                toast.error("Verification failed.");
            }
        } catch (e) {
            console.log(e);
        }
    }

    const codeResend = async () => {
        try {
            const response = await fetch("http://localhost:8080/backend/ResendCode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',

            })

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    toast.success(data.content);
                } else {
                    toast.error(data.content);
                }
            } else {
                toast.error("Verification code failed to send!");
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
                                <span className="fs-3 bold">Verify Your Account</span>
                                <span className="light-font">
                                    Please verify your email to secure your account and unlock all features. Click the button below to complete the process.
                                </span>
                            </div>

                            <div className="d-flex flex-column mt-5" style={{gap: "7px"}}>
                                <label className="fs-6">Verification Code</label>
                                <input className={styles.inputField} type="email" id="email"
                                       onChange={(e) => {
                                           setVerification(e.target.value)
                                       }}/>
                            </div>

                            <button className={styles.lgPrBtn} onClick={onSubmit}>Verify & Continue</button>

                            <div
                                className="d-flex justify-content-center"
                                style={{gap: "11px"}}
                            >
                                {/*<span className="light-font">Can't find the code?</span>*/}
                                <a onClick={codeResend}>Resend code</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
