import { useState } from "react";
import { motion } from "framer-motion";
import Input from "./formInput/input";
import style from "./userCheckout.module.css";
import useCheckForm from "@/hooks/useCheckForm";
import Button from "../ui/button/btn";
import { useNotification } from "@/hooks/useNotification";
import useConfEmpty from "@/hooks/useConfEmpty";
import { inpuShip, inpuReg, fieldProfile } from "@/helpers/inputInfo";
import useFill from "@/hooks/useFillForm";
/**
 * UserProfile Component
 * Handles the editing of user profile and address details.
 * Validates form inputs, tracks changes, and prevents unnecessary backend requests.
 */
function UserProfile({ handleSubmit }) {
  const { notification } = useNotification();
  const { isValid } = useCheckForm();
  const [hasChanged, setHasChanged] = useState([]);
  const { scope, focus, isEmpty, empty } = useConfEmpty();
  const user = useFill();
  //Checks changes in the form for handling requests to the beckend only if the form has chenged
  function handleChange(e) {
    const { name } = e.target;
    const det = inpuReg.some((inp) => inp.id === name);
    const adr = inpuShip.some((inp) => inp.id === name);
    if (det) {
      if (!hasChanged.includes("user")) {
        setHasChanged((prev) => [...prev, "user"]);
      }
    } else if (adr) {
      if (!hasChanged.includes("add")) {
        setHasChanged((prev) => [...prev, "add"]);
      }
    }
  }
  const handleThisSubmit = (e) => {
    e.preventDefault();
    let isOk, data;
    // Cheking for empty fields in the form
    const emp = isEmpty(e, fieldProfile);
    //Stoping unnecessary requests to beckend
    if (hasChanged.length === 0) {
      notification(
        null,
        "Invalid Action:",
        "User details have not changed",
        "error"
      );
      return;
    }
    if (!emp) {
      ({ isOk, data } = isValid({ e, fields: fieldProfile, empty }));
    }
    isOk && handleSubmit(data, hasChanged);
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
