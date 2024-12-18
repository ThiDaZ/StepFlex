import DashboardNav from "@/app/components/Account/DashboardNav";
import Footer from "@/app/components/footer/Footer";
import Header from "@/app/components/header/Header";
import Product from "@/app/components/Account/Product";

export const metadata = {
    title: "Step Flex",
};

export default function Account() {
  return (
    <>
      <Header />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Add Products</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardNav />
            </div>
            <div className="col-lg-9">
              <Product />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
