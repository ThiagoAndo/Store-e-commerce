import Link from "next/link";
import { useRouter } from "next/router";
import classes from "./main-header.module.css";

function MainHeader() {
  const router = useRouter();
  const isActive = router.pathname;
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.navigation}>
        <li>
            <Link
              className={
                isActive === "/user"
                  ? `${classes.active}`
                  : `${classes.link}`
              }
              href="/user/signIn"
            >
             User
            </Link>
          </li>
          <li>
            <Link
              className={
                isActive === "/userInfo"
                  ? `${classes.active}`
                  : `${classes.link}`
              }
              href="/login"
            >
             Log in
            </Link>
          </li>

          <li>
            <Link
              className={
                isActive === "/product"
                  ? `${classes.active}`
                  : `${classes.link}`
              }
              href="/product"
            >
              Product
            </Link>
          </li>
          <li>
            <Link
              className={
                isActive === "/changePassword"
                  ? `${classes.active}`
                  : `${classes.link}`
              }
              href="/changePassword"
            >
              Password
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
