import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const body = JSON.stringify(req);
    try {
        const response = await fetch("http://localhost:8080/backend/ProductListing", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: body,
        });

        const data = await response.json();
        return NextResponse.json(data, {status: response.status});

    }catch (e){
        console.error(e);
        return NextResponse.json({message: "Error creating product"}, {status: 500});
    }
}