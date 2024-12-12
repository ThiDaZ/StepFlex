
import AccountEdit from "@/app/components/Account/AccountEdit";
import DashboardNav from "@/app/components/Account/DashboardNav";
import Footer from "@/app/components/footer/Footer";
import Header from "@/app/components/header/Header";
import React from "react";

export const metadata = {
  title: "My Account Edit || StepFlex",
  description: "StepFlex",
};
export default function page() {
  return (
    <>
      <Header/>
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">My Account Edit</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardNav />
            </div>
            <div className="col-lg-9">
              <AccountEdit />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
