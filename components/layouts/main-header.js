import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import classes from "./main-header.module.css";
import SearchBar from "./search-bar";
import Image from "next/image";
import User from "@/assets/user.svg";
import Userlog from "@/assets/userLog.svg";
import { useSession, signOut } from "next-auth/react";
import { useContext } from "react";
import { ProductContext } from "@/store/products-context";

function MainHeader() {
  const [isLogin, setIsLogin] = useState(false);
  const { data: session, status } = useSession();
  const store = useContext(ProductContext);

  useEffect(() => {
    if (session) {
      setIsLogin(true);
    }
  }, [session]);

  function handleClick() {
    store.getFiltered(6);
  }
  function logoutHandler() {
    signOut();
  }
  return (
    <header className={classes.header}>
      <nav className={classes.navigation}>
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0 2px 0px rgba(242, 100, 18, 0.8)",
            borderRadius: " 0.5rem",
            paddingBottom: "0.3rem",
          }}
          transition={{ type: "spring", duration: 0.3 }}
          onClick={handleClick}
        >
          <Link className={classes.link} href="/">
            Next Store
          </Link>
        </motion.div>
        <motion.div
          className={classes.search}
          whileHover={{ width: 410 }}
          transition={{ type: "spring", duration: 0.6, marginRight: 0 }}
        >
          <SearchBar />
        </motion.div>
        {isLogin || (
          <motion.div
            whileHover={{
              scale: 1.1,
              borderRadius: "10rem",
              boxShadow: "0 2px 0px rgba(242, 100, 18, 0.8)",
            }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            <Link className={classes.link} href="/user/login">
              <Image
                className={classes.img}
                priority
                src={User}
                alt="user"
                height={60}
                width={60}
              />
            </Link>
          </motion.div>
        )}
        {isLogin && (
          <motion.div
            whileHover={{
              scale: 1.1,
              borderRadius: "10rem",
              boxShadow: "0 2px 0px rgba(242, 100, 18, 0.8)",
            }}
          >
            <Link className={classes.link} href="#">
              <Image
                className={classes.img}
                priority
                src={Userlog}
                alt="user"
                height={60}
                width={60}
              />
            </Link>
          </motion.div>
        )}
        
        {session && (
          <div>
            <button onClick={logoutHandler}>Logout</button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default MainHeader;
