import { motion } from "framer-motion";
import { inpuReg, fieldRegister } from "@/helpers/inputInfo";
import useForm from "@/hooks/useCheckForm";
import Button from "../ui/button/btn";
import Input from "./formInput/input";
import style from "./UserSignIn.module.css";
import useConfEmpty from "@/hooks/confEmpty";

function UserSignIn({ handleGuest, isOrdering, handleSubmit }) {
  const { getEvent } = useForm();
  const { scope, focus, isEmpty } = useConfEmpty();

  function handleEvent(e) {
    e.preventDefault();
    const empty = isEmpty(e, fieldRegister);
    if (empty) {
      const { signin, data } = getEvent(e);
      // signin && handleSubmit(data);
    }
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
                GUEST CHECKOUT
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
