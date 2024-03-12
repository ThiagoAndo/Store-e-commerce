import Image from "next/image";

import Face from "@/assets/facebook.svg";
import Twitter from "@/assets/twitter.svg";
import Instagram from "@/assets/instagram.svg";

import classes from "./footer.module.css";

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes["footer-col"]}>
            <h4>company</h4>
            <ul className={classes.ul_style}>
              <li>
                <a className={classes.hover}>about us</a>
              </li>
              <li>
                <a className={classes.hover}>our services</a>
              </li>
              <li>
                <a className={classes.hover}>privacy policy</a>
              </li>
              <li>
                <a className={classes.hover}>affiliate program</a>
              </li>
            </ul>
          </div>
          <div className={classes["footer-col"]}>
            <h4>get help</h4>
            <ul className={classes.ul_style}>
              <li>
                <a className={classes.hover}>FAQ</a>
              </li>
              <li>
                <a className={classes.hover}>shipping</a>
              </li>
              <li>
                <a className={classes.hover}>returns</a>
              </li>
              <li>
                <a className={classes.hover}>order status</a>
              </li>
              <li>
                <a className={classes.hover}>payment options</a>
              </li>
            </ul>
          </div>
          <div className={classes["footer-col"]}>
            <h4>online shop</h4>
            <ul className={classes.ul_style}>
              <li>
                <a className={classes.hover}>watch</a>
              </li>
              <li>
                <a className={classes.hover}>bag</a>
              </li>
              <li>
                <a className={classes.hover}>shoes</a>
              </li>
              <li>
                <a className={classes.hover}>dress</a>
              </li>
            </ul>
          </div>
          <div className={classes["footer-col"]}>
            <h4>follow us</h4>
            <div className={classes["social-inks"]}>
              <a className={classes._a}>
                <Image priority src={Face} alt="user" width={30} height={30} />
              </a>
              <a className={classes._a}>
                <Image
                  priority
                  src={Twitter}
                  alt="user"
                  width={30}
                  height={30}
                />
              </a>
              <a className={classes._a}>
                <Image
                  priority
                  src={Instagram}
                  alt="user"
                  width={30}
                  height={30}
                />
              </a>
              <a className={classes._a}>
                <Image
                  priority
                  src={Twitter}
                  alt="user"
                  width={30}
                  height={30}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
