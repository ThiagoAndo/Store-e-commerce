import Link from "next/link";
import { useRouter } from "next/router";
import classes from "./user-header.module.css";

function UserHeader() {
  const router = useRouter();
  const isActive = router.pathname;
  return (
    <header className={classes.header}>
        <ul className={classes.navigation}>
        <li>
            <Link
              className={
                isActive === "/user/signIn"
                  ? `${classes.active}`
                  : `${classes.link}`
              }
              href="/user/signIn"
            >
             Sign In
            </Link>
          </li>
          <li>
            <Link
              className={
                isActive === "/user/login"
                  ? `${classes.active}`
                  : `${classes.link}`
              }
              href="/user/login"
            >
             Log in
            </Link>
          </li>

          <li>
            <Link
              className={
                isActive === "/user/changeData"
                  ? `${classes.active}`
                  : `${classes.link}`
              }
              href="/user/changeData"
            >
              Edit Profile
            </Link>
          </li>
          <li>
            <Link
              className={
                isActive === "/user/changePassword"
                  ? `${classes.active}`
                  : `${classes.link}`
              }
              href="/user/changePassword"
            >
              Chane Password
            </Link>
          </li>
        </ul>
    </header>
  );
}

export default UserHeader;
