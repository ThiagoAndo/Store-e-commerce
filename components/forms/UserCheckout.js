import { motion } from "framer-motion";

import Radio from "../ui/formInput/inputRadio";
import {
  inpuShip,
  inpuPay,
  inpuReg,
  fieldChekout,
} from "@/components/ui/formInput/inputInfo";
import Cart from "../cart/cart";
import Input from "../ui/formInput/input";
import style from "./UserSignIn.module.css";
import style_2 from "./UserCheckout.module.css";
import useForm from "@/hooks/useForm";

function UserCheckOut({ handleSubmit }) {
  const { cartItems, scope, checked, focus, setChecked, getEvent } = useForm();
  const inpCheck = inpuReg.slice();
  inpCheck.pop();

  const onOptionChange = (val) => {
    setChecked(val);
    if (val != "e-money") {
      focus({
        target: {
          id: fieldChekout[fieldChekout.length - 1].input,
        },
      });
      focus({
        target: {
          id: fieldChekout[fieldChekout.length - 2].input,
        },
      });
    }
  };

  const handleThisSubmit = (e) => {
    const { check } = getEvent(e, true);
    check && console.log("submit");
  };
  return (
    <motion.div
      className={style_2.check_pag}
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <div className={style_2.container}>
        <form onSubmit={handleThisSubmit} ref={scope}>
          <div className={style.action}>
            <h2>CHECKOUT</h2>
          </div>
          <p>BILLING DETAILS</p>
          <div className={style_2.detail}>
            {inpCheck.map((inp) => (
              <Input
                key={inp.id}
                id={inp.id}
                ph={inp.ph}
                typeI={inp.type}
                handleFocus={focus}
              />
            ))}
          </div>
          <p>SHIPPING INFO</p>
          <div className={style_2.shipping}>
            {inpuShip.map((inp) => (
              <Input
                key={inp.id}
                id={inp.id}
                ph={inp.ph}
                typeI={inp.type}
                handleFocus={focus}
              />
            ))}
          </div>
          <p>SHIPPING INFO</p>
          <div className={style_2.payment}>
            <p>Payment Method </p>
            <Radio
              id={"e-money"}
              lab={"e-money"}
              onChoice={onOptionChange}
              check={checked}
            />
            <Radio
              id={"cash"}
              name={"acquisition"}
              lab={"Cash on Delivery"}
              onChoice={onOptionChange}
              check={checked}
            />
            {inpuPay.map((inp) => (
              <Input
                key={inp.id}
                id={inp.id}
                ph={inp.ph}
                typeI={inp.type}
                dis={checked === "e-money" ? false : true}
                handleFocus={focus}
              />
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
            className={style.button}
          >
            CONTINUE & PAY
          </motion.button>
        </form>
      </div>
      {cartItems.length > 0 && (
        <div className={style_2.summary}>
          <Cart cart={false} />
        </div>
      )}
    </motion.div>
  );
}

export default UserCheckOut;
