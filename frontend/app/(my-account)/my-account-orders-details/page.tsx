import DashboardNav from "@/app/components/Account/DashboardNav";
import OrderDetails from "@/app/components/Account/OrderDetails";
import Footer from "@/app/components/footer/Footer";
import Header from "@/app/components/header/Header";

export const metadata = {
    title: "My Account Orders || StepFlex",
    description: "StepFlex",
  };

export default function OrderDetailsPage() {
  return (
    <>
      <Header />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">My Orders</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardNav />
            </div>
            <div className="col-lg-9">
              <OrderDetails />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
