import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import classes from "./main-header.module.css";
import SearchBar from "./search-bar";
import Image from "next/image";
import User from "@/assets/user.svg";
import Userlog from "@/assets/userLog.svg";
import { useSession, signOut } from "next-auth/react";

function MainHeader() {
  const [mySvg, setMySvg] = useState(User);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      setMySvg(Userlog) ;
    }
  }, [session]);

  function handleClick(call) {
    if (call) {
      setIsSearch(false);
      setSearchKey(Math.random());
    } else {
      setIsSearch(true);
    }
  }
  return (
    <header className={classes.header}>
      <nav className={classes.navigation}>
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 2px rgba(242, 100, 18, 0.8)",
            borderRadius: " 0.5rem",
          }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <Link className={classes.link} href="/">
            Next Store
          </Link>
        </motion.div>
        <motion.div
          className={classes.search}
          whileHover={{ width: 380 }}
          transition={{ type: "spring" }}
        >
          <SearchBar myclass={classes.bar} keyDown={handleClick} />
        </motion.div>
        <motion.div
          whileHover={{
            scale: 1.1,
          }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <Link className={classes.link} href="/user/login">
            <Image
              className={classes.img}
              priority
              src={mySvg}
              alt="user"
              height={60}
              width={60}
            />
          </Link>
        </motion.div>
      </nav>
    </header>
  );
}

export default MainHeader;
