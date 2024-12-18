import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['192.168.1.6', 'localhost'], // Add your image hostnames here
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*",
                    },
                    {
                        key: "Access-Control-Allow-Credentials",
                        value: "true",
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, PUT, POST, DELETE, OPTIONS",
                    },
                    {
                        key: "Access-Control-Expose-Headers",
                        value: "Set-Cookie, X-Total-Count, Authorization",
                    },

                ],
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: "/backend/:path*",
                destination: "http://localhost:8080/:path*",
            },
        ];
    },
};

export default nextConfig;
