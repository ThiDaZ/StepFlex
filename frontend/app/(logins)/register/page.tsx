"use client"
import Image from "next/image";
import styles from "../logins.module.css";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            first_name: firstName,
            last_name: lastName,
            mobile: mobile,
            email: email,
            password: password,
        }

        console.log(user_dto);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user_dto),
                credentials: 'include',

            })

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    toast.success("Register Successfully");
                    router.replace("/verification");
                } else {
                    toast.error(data.content);
                }
            }

        } catch (err) {
            console.log("error: ", err);
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
                            <Image
                                src="/images/logo/black-circle.png"
                                alt=""
                                width={23}
                                height={23}
                            />
                            <span className="bold">
                Unlock Rare Kicks, Elevate Your Style.
              </span>
                        </div>
                        <Image
                            src="/images/backgrounds/login-Background.webp"
                            alt=""
                            width={500}
                            height={900}
                            className={styles.signBackgroundImg}
                        />
                    </div>
                    <div className="col col-lg col-xl vh-100 d-flex justify-content-center align-items-center p-5">
                        <div className="d-flex flex-column " style={{gap: "30px"}}>
                            <div
                                className="d-flex align-items-center"
                                style={{gap: "16px"}}
                            >
                                <Image
                                    src="/images/logo/StepFlex-86.png"
                                    height={86}
                                    width={86}
                                    alt="logo"
                                />
                                <a href={"/"}><h3 className="kanitBold">Step Flex</h3></a>

                            </div>
                            <div className="d-flex flex-column" style={{gap: "16px"}}>
                                <span className="fs-3 bold">Sign Up</span>
                                <span className="light-font">
                  Create your Step Flex account now to start copping fresh kicks
                  and manage your trades like a pro
                </span>
                            </div>
                            <div className="d-flex flex-column flex-md-row d-grid " style={{gap: "7px"}}>
                                <div className="d-flex  flex-column col-12 col-md-6" style={{gap: "7px"}}>
                                    <label className="fs-6">First Name</label>
                                    <input className={styles.inputField} type="text" id="name"
                                           onChange={(e) => setFirstName(e.target.value)}/>
                                </div>
                                <div className="d-flex flex-column col-12 col-md-6" style={{gap: "7px"}}>
                                    <label className="fs-6">Last Name</label>
                                    <input className={styles.inputField} type="text" id="name"
                                           onChange={(e) => setLastName(e.target.value)}/>
                                </div>
                            </div>

                            <div className="d-flex flex-column" style={{gap: "7px"}}>
                                <label className="fs-6">Mobile</label>
                                <input className={styles.inputField} type="text" id="mobile"
                                       onChange={(e) => setMobile(e.target.value)}/>
                            </div>
                            <div className="d-flex flex-column" style={{gap: "7px"}}>
                                <label className="fs-6">Email</label>
                                <input className={styles.inputField} type="email" id="email"
                                       onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="d-flex flex-column" style={{gap: "7px"}}>
                                <label className="fs-6">Password</label>
                                <input
                                    className={styles.inputField}
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className={styles.lgPrBtn} onClick={onSubmit}>Register</button>
                            <div
                                className="d-flex justify-content-center"
                                style={{gap: "11px"}}
                            >
                                <span className="light-font">Already a member?</span>
                                <a href="/login">Sign in</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
