import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useState } from "react";
import classes from "./main-header.module.css";
import SearchBar from "./search-bar";

function MainHeader() {
  const [isSearch, setIsSearch] = useState(false);
  const [serchKey, setSearchKey] = useState(1);
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
        <div>
          <Link className={classes.link} href="/">
            Next Store
          </Link>
        </div>
        <motion.div
          className={classes.search}
          whileHover={{ width: 380 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <SearchBar myclass={classes.bar} keyDown={handleClick}  />
        </motion.div>
        <div id="btn">
          <div className="filt"></div>
          <div>
            <p>Sign In</p>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MainHeader;
