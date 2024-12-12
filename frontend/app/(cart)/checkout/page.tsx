import Checkout from "@/app/components/cart/checkout";
import Footer from "@/app/components/footer/Footer";
import Header from "@/app/components/header/Header";

export default function checkoutPage() {
  return (
    <>
      <Header />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Check Out</div>
        </div>
      </div>
      <Checkout />
      <Footer />
    </>
  );
}
