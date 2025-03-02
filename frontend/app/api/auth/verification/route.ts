import {NextResponse} from "next/server";

export async function POST(req: Request) {

    const body = await req.json();

    try {
        const response = await fetch("https://localhost:8080/backend/Verification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return NextResponse.json(data, {status: response.status});


    } catch (e) {
        console.error(e);
        return NextResponse.json({message: "Error Sign up"}, {status: 500});
    }


}