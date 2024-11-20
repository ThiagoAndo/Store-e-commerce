import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Radio from "./formInput/inputRadio";
import Cart from "../cart/cart";
import Input from "./formInput/input";
import style from "./UserCheckout.module.css";
import Button from "../ui/button/btn";
import { inpuReg, inpuShip, inpuPay, fieldChekout } from "@/helpers/inputInfo";
import { useNotification } from "@/hooks/useNotification";
import useFill from "@/hooks/useFillForm";
import useConfEmpty from "@/hooks/useConfEmpty";
import { useSelector } from "react-redux";
import useCheckForm from "@/hooks/useCheckForm";

// This form is used for userChekout and user profile
function UserCheckOut({ handleSubmit }) {
  const user = useFill();
  const [checked, setChecked] = useState("e-money");
  const cartItems = useSelector((state) => state.cart.items);
  const { notification } = useNotification();
  const { scope, focus, isEmpty, empty } = useConfEmpty();
  const { isValid } = useCheckForm();

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
    e.preventDefault();
    if (cartItems.length <= 0) {
      notification(null, "Empty cart:", `Chose a product to prceed. `, "error");
    }
    const emp = isEmpty(e, fieldChekout);

    // const { prof, check, data } = getEvent(e, false, false, checkout, [
    //   profile,
    //   hasChanged,
    // ]);
    // check && handleSubmit(data);
    // empty = isEmpty(e, fieldChekout);
  };
  return (
    <motion.div
      className={style.check_pag}
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
            <h2>{"CHECKOUT"}</h2>
          </div>
          <p> {"BILLING DETAILS"}</p>
          <div className={style.detail}>
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
          <p> {"SHIPPING INFO"}</p>
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
          <p>PAYMENT DETAILS </p>
          <div className={style.payment}>
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
          <Button style={style.button}>{"CONTINUE & PAY"}</Button>
        </form>
      </div>
      {cartItems.length > 0 ? (
        <div className={style.summary}>
          <Cart cart={false} />
        </div>
      ) : null}
    </motion.div>
  );
}

export default UserCheckOut;
