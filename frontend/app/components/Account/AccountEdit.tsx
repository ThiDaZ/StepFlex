"use client";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function AccountEdit() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await fetch("http://localhost:8080/backend/LoadUserData", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                })
                if (response.ok) {
                    const data = await response.json();
                    setFirstName(data.content.first_name.toString());
                    setLastName(data.content.last_name);
                    setEmail(data.content.email);
                } else {
                    console.log("error: ", response.status);
                }
            } catch (e) {
                console.log(e)
            }
        }
        loadUser()
    }, [])

    const onSubmit = async () => {

        const user_dto = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            new_password: newPassword,
            confirm_password: confirmPassword,
        }

        console.log(
            "user_dto: ",
            user_dto)

        try {
            const response = await fetch("http://localhost:8080/backend/UpdateUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user_dto),
                credentials: "include",
            })

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    toast.success("User has updated successfully.")
                    setPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                } else {
                    toast.error(data.content.toString())
                    console.log("error: ", data.content)
                }
            } else {
                toast.error("something went wrong. Please try again later.")
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="my-account-content account-edit">
            <div className="">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className=""
                    id="form-password-change"
                    action="#"
                >
                    <div className="tf-field style-1 mb_15">
                        <input
                            className="tf-field-input tf-input"
                            placeholder=" "
                            type="text"
                            id="firstName"
                            required
                            name="first name"
                            value={firstName || ""}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label
                            className="tf-field-label fw-4 text_black-2"
                            htmlFor="firstName"
                        >
                            First name
                        </label>
                    </div>
                    <div className="tf-field style-1 mb_15">
                        <input
                            className="tf-field-input tf-input"
                            type="text"
                            required
                            id="lastName"
                            name="last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <label
                            className="tf-field-label fw-4 text_black-2"
                            htmlFor="lastName"
                        >
                            Last name
                        </label>
                    </div>
                    <div className="tf-field style-1 mb_15">
                        <input
                            className="tf-field-input tf-input"
                            placeholder=" "
                            type="email"
                            id="emails"
                            name="email"
                            value={email}
                            disabled={true}
                        />
                        <label
                            className="tf-field-label fw-4 text_black-2"
                            htmlFor="emails"
                        >
                            Email
                        </label>
                    </div>
                    <h6 className="mb_20">Password Change</h6>
                    <div className="tf-field style-1 mb_30">
                        <input
                            className="tf-field-input tf-input"
                            placeholder=" "
                            type="password"
                            autoComplete="current-password"
                            id="property4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label
                            className="tf-field-label fw-4 text_black-2"
                            htmlFor="property4"
                        >
                            Current password
                        </label>
                    </div>
                    <div className="tf-field style-1 mb_30">
                        <input
                            className="tf-field-input tf-input"
                            placeholder=" "
                            type="password"
                            id="property5"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <label
                            className="tf-field-label fw-4 text_black-2"
                            htmlFor="property5"
                        >
                            New password
                        </label>
                    </div>
                    <div className="tf-field style-1 mb_30">
                        <input
                            className="tf-field-input tf-input"
                            placeholder=" "
                            type="password"
                            id="property6"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label
                            className="tf-field-label fw-4 text_black-2"
                            htmlFor="property6"
                        >
                            Confirm password
                        </label>
                    </div>
                    <div className="mb_20">
                        <button
                            className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                            onClick={onSubmit}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
