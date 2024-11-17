import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Input from "./formInput/input";
import style from "./userCheckout.module.css";
import useForm from "@/hooks/useForm";
import Button from "../ui/button/btn";
import { useNotification } from "@/hooks/useNotification";
import useConfEmpty from "@/hooks/confEmpty";
import { inpuShip, inpuReg, fieldProfile } from "@/helpers/inputInfo";
import useFill from "@/hooks/useFillForm";
function UserProfile({ handleSubmit }) {
  const { notification } = useNotification();
  //   const { scope, focus,  getEvent } = useForm();
  const [hasChanged, setHasChanged] = useState([]);
  const { scope, focus, isEmpty } = useConfEmpty();
  const user = useFill();

  //Checks changes in the form for handling requests to the beckend only if the form has chenged
  function handleChange(e) {
    const det = inpuReg.map((inp) => e.target.name === inp.id);
    const adr = inpuShip.map((inp) => e.target.name === inp.id);
    if (det.includes(true)) {
      if (!hasChanged.includes("user")) {
        setHasChanged((prev) => [...prev, "user"]);
      }
    } else if (adr.includes(true)) {
      if (!hasChanged.includes("add")) {
        setHasChanged((prev) => [...prev, "add"]);
      }
    }
  }

  const handleThisSubmit = (e) => {
    e.preventDefault();
    if (hasChanged.length === 0) {
      notification(
        null,
        "Invalid Action:",
        "USER DETAILS HAVE NOT CHANGED",
        "error"
      );
      return;
    }
    const empty = isEmpty(e, fieldProfile);
    console.log("empty");
    console.log(empty);
    // const { prof, check, data } = getEvent(e, false, false, checkout, [
    //   profile,
    //   hasChanged,
    // ]);
    // profile && prof && handleSubmit(data, hasChanged);
  };

  return (
    <motion.div
      className={style.userData}
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <div className={style.container}>
        <form
          onSubmit={handleThisSubmit}
          ref={scope}
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <div className={style.action}>
            <h2>{"EDIT PROFILE"}</h2>
          </div>
          <p> {"ENTER DETAILS"}</p>
          <div className={style.detail_profile}>
            {inpuReg.slice(0, 3).map((inp, i) => (
              <Input
                key={inp.id}
                id={inp.id}
                ph={inp.ph}
                typeI={inp.type}
                handleFocus={focus}
                val={user[0][i]}
              />
            ))}
          </div>
          <p> {"ENTER ADDRESS"}</p>
          <div className={style.shipping}>
            {inpuShip.map((inp, i) => (
              <Input
                key={inp.id}
                id={inp.id}
                ph={inp.ph}
                typeI={inp.type}
                handleFocus={focus}
                val={user[1][i]}
              />
            ))}
          </div>
          <Button style={style.button}>{"SAVE"}</Button>
        </form>
      </div>
    </motion.div>
  );
}

export default UserProfile;
