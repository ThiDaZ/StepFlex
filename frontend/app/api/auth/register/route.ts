import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    try {
        const response = await fetch('http://localhost:8080/backend/SignUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body),
        });

        const data = await response.json();
        // console.log(JSON.stringify(body));
        return NextResponse.json(data, {status: response.status});

    } catch (e) {
        console.error(e);
        return NextResponse.json({message: "Error Sign up"}, {status: 500});
    }

}