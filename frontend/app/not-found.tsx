/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
export const metadata = {
  title: "Page Not Found ||StepFlex",
  description: "StepFlex",
};
export default function notFound() {
  return (
    <>
      <Header />
      <section className="page-404-wrap">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="image">
                <img src="/images/item/404.svg" alt="image" />
              </div>
              <div className="title">Oops...That link is broken.</div>
              <p>
                Sorry for the inconvenience. Go to our homepage to check out our
                latest collections.
              </p>
              <Link
                href="/"
                className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
