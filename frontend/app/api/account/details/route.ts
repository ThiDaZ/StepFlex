import {NextResponse} from "next/server";

export async function GET() {

    try {
        const response = await fetch("http://localhost:8080/backend/LoadDetails")
        const data = await response.json();
        return NextResponse.json(data, {status: response.status});

    } catch (err) {
        console.error(err);
        return NextResponse.json({message: "Error Load details"}, {status: 500});
    }

}