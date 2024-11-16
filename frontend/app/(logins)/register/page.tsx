import Image from "next/image";
import styles from "../logins.module.css";

export default function Register() {
  return (
    <div>
      <div className="container-fluid p-0">
        <div className="d-flex p-0">
          <div className="col-lg-7 col-xl-auto d-none d-lg-block vh-100 p-3">
            <div
              className={`d-flex align-items-center pb-2 ${styles.signTag}`}
              style={{ gap: "17px" }}
            >
              <Image
                src="/images/logo/black-circle.png"
                alt=""
                width={23}
                height={23}
              />
              <span className="bold">
                Unlock Rare Kicks, Elevate Your Style.
              </span>
            </div>
            <Image
              src="/images/backgrounds/login-Background.webp"
              alt=""
              width={500}
              height={900}
              className={styles.signBackgroundImg}
            />
          </div>
          <div className="col col-lg col-xl vh-100 d-flex justify-content-center align-items-center p-5">
            <div className="d-flex flex-column " style={{ gap: "30px" }}>
              <div
                className="d-flex align-items-center"
                style={{ gap: "16px" }}
              >
                <Image
                  src="/images/logo/StepFlex-86.png"
                  height={86}
                  width={86}
                  alt="logo"
                />
                <h1 className="kanitBold">Step Flex</h1>
              </div>
              <div className="d-flex flex-column" style={{ gap: "16px" }}>
                <span className="fs-3 bold">Sign Up</span>
                <span className="light-font">
                  Create your Step Flex account now to start copping fresh kicks
                  and manage your trades like a pro
                </span>
              </div>
              <div className="d-flex flex-column" style={{ gap: "7px" }}>
                <label className="fs-6">Full Name</label>
                <input className={styles.inputField} type="text" id="name" />
              </div>
              <div className="d-flex flex-column" style={{ gap: "7px" }}>
                <label className="fs-6">Mobile</label>
                <input className={styles.inputField} type="text" id="mobile" />
              </div>
              <div className="d-flex flex-column" style={{ gap: "7px" }}>
                <label className="fs-6">Email</label>
                <input className={styles.inputField} type="email" id="email" />
              </div>
              <div className="d-flex flex-column" style={{ gap: "7px" }}>
                <label className="fs-6">Password</label>
                <input
                  className={styles.inputField}
                  type="password"
                  id="password"
                />
              </div>
              <button className={styles.lgPrBtn}>Login</button>
              <div
                className="d-flex justify-content-center"
                style={{ gap: "11px" }}
              >
                <span className="light-font">Already a member?</span>
                <a href="/login">Sign in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
