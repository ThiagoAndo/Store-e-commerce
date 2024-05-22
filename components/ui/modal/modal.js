import { Fragment } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, type: "spring" }}
      exit={{ opacity: 0, y: 100 }}
      open
      className={
        classes.modal + " " + `${props.isConf && classes.confirmation}`
      }
    >
      <div className={classes.content}>{props.children}</div>
    </motion.div>
  );
};

const Modal = (props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted ? (
    <Fragment>
      {createPortal(<Backdrop />, document.querySelector("#myportal"))}
      {createPortal(
        <ModalOverlay isConf={props.isConf}>{props.children}</ModalOverlay>,
        document.querySelector("#myportal")
      )}
    </Fragment>
  ) : null;
};

export default Modal;
