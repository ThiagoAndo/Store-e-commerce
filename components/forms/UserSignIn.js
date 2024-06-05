import { motion } from "framer-motion";
import { inpuReg } from "@/components/ui/formInput/inputInfo";

import useForm from "@/hooks/useForm";
import Button from "../ui/button/btn";
import Input from "../ui/formInput/input";
import style from "./UserSignIn.module.css";
function UserSignIn({ handleGuest, isOrdering, handleSubmit }) {
  const { scope, focus, getEvent } = useForm();
  function handleEvent(e) {
    const { signin, data } = getEvent(e,true, false,false,false);
    signin && handleSubmit(data);
  }
  return (
    <>
      <motion.div
        className={style.container}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <form onSubmit={handleEvent} ref={scope}>
          <div className={style.action}>
            <h2>REGISTRATION</h2>
            {isOrdering && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 250 }}
                onClick={handleGuest}
              >
                Guest checkout
              </motion.a>
            )}
          </div>
          <div className={style.input_container}>
            {inpuReg.map((inp) => (
              <Input
                key={inp.id}
                id={inp.id}
                ph={inp.ph}
                typeI={inp.type}
                handleFocus={focus}
              />
            ))}
          </div>
          <Button style={style.button}>REGISTER </Button>
        </form>
      </motion.div>
    </>
  );
}

export default UserSignIn;
