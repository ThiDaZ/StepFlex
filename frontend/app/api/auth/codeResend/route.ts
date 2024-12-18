import {NextResponse} from "next/server";

export async function POST() {
    try {
        const response = await fetch("http://localhost:8080/backend/ResendCode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        })

        const data = await response.json();
        return NextResponse.json(data, {status: response.status});

    }catch (e){
        console.error("Error in ResendCode API:", e);
        return NextResponse.json({message: "Code resend failed!"}, {status: 500});
    }
}