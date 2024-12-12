import DashboardNav from "@/app/components/Account/DashboardNav";
import Wishlist from "@/app/components/Account/wishlist";
import Footer from "@/app/components/footer/Footer";
import Header from "@/app/components/header/Header";

export default function wishlistPage() {
  return (
    <>
      <Header />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">My Account Wishlist</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardNav />
            </div>
            <div className="col-lg-9">
              <Wishlist />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
