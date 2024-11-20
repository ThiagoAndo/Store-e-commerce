import { motion } from "framer-motion";
import { inpuReg, fieldRegister } from "@/helpers/inputInfo";
import Button from "../ui/button/btn";
import Input from "./formInput/input";
import style from "./UserSignIn.module.css";
import useConfEmpty from "@/hooks/useConfEmpty";
import useCheckForm from "@/hooks/useCheckForm";
/**
 * UserSignIn Component
 * Handles user registration by validating input fields and submitting form data.
 * Supports a guest checkout option if the user is placing an order.
 */
function UserSignIn({ handleGuest, isOrdering, handleSubmit }) {
  // Custom hooks for validation and form field management
  const { isValid } = useCheckForm();
  const { scope, focus, isEmpty, empty } = useConfEmpty();

  /**
   * Handles the form submission:
   * - Validates fields to ensure no empty or invalid inputs.
   * - Calls the parent handleSubmit function with the form data if validation succeeds.
   */
  function handleEvent(e) {
    e.preventDefault();
    let isOk, data;

    // Checks for empty fields before validating the inputs
    const emp = isEmpty(e, fieldRegister);
    if (!emp) {
      ({ isOk, data } = isValid({ e, fields: fieldRegister, empty }));
    }

    // Submits the data if validation is successful
    isOk && handleSubmit(data);
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
              // Displays "Guest Checkout" option for users placing an order
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
            {/* Renders registration input fields dynamically */}
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
          <Button style={style.button}>REGISTER</Button>
        </form>
      </motion.div>
    </>
  );
}

export default UserSignIn;
