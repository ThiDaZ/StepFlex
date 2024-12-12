import DashboardNav from "@/app/components/Account/DashboardNav";
import Footer from "@/app/components/footer/Footer";
import Header from "@/app/components/header/Header";
import MyAccount from "@/app/components/Account/MyAccount";

export default function Account() {
  return (
    <>
      <Header />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">My Account</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardNav />
            </div>
            <div className="col-lg-9">
              <MyAccount />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
