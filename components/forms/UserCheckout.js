import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Radio from "../ui/formInput/inputRadio";
import Cart from "../cart/cart";
import Input from "../ui/formInput/input";
import style from "./UserSignIn.module.css";
import style_2 from "./UserCheckout.module.css";
import useForm from "@/hooks/useForm";
import Button from "../ui/button/btn";
import { inpuReg } from "@/components/ui/formInput/inputInfo";
function UserCheckOut({
  handleSubmit,
  inpuShip,
  inpuPay,
  inpCheck,
  fieldChekout,
  checkout,
  profile,
}) {
  const { cartItems, scope, checked, focus, setChecked, getEvent } = useForm();
  const [User, setUSer] = useState([[], []]);
  const [hasChanged, setHasChanged] = useState([]);

  function handleChange(e) {
    const det = inpuReg.map((inp) => e.target.name === inp.id);
    const adr = inpuShip.map((inp) => e.target.name === inp.id);
    if (det.includes(true)) {
      if (!hasChanged.includes("user")) {
        setHasChanged((prev) => [...prev, "user"]);
      }
    } else if (adr.includes(true)) {
      //This is just a test
      if (!hasChanged.includes("add")) {
        setHasChanged((prev) => [...prev, "add"]);
      }
    }
  }

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
    const { prof, check, data } = getEvent(e, false, false, checkout, [
      profile,
      hasChanged,
    ]);
    checkout && check && handleSubmit(data);
    profile && prof && handleSubmit(data, hasChanged);
  };
  useEffect(() => {
    setTimeout(() => {
      setUSer([
        [
          localStorage.getItem("first"),
          localStorage.getItem("last"),
          localStorage.getItem("email"),
        ],
        [
          localStorage.getItem("line_one"),
          localStorage.getItem("line_two"),
          localStorage.getItem("town_city"),
          localStorage.getItem("constry_state"),
        ],
      ]);
    }, 500);
  }, [setUSer]);
  return (
    <motion.div
      className={checkout === true ? style_2.check_pag : style_2.userData}
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <div className={style_2.container}>
        <form
          onSubmit={handleThisSubmit}
          ref={scope}
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <div className={style.action}>
            <h2>{checkout === true ? "CHECKOUT" : "EDIT PROFILE"}</h2>
          </div>
          <p> {checkout === true ? "BILLING DETAILS" : "ENTER DETAILS"}</p>
          <div
            className={
              checkout === true ? style_2.detail : style_2.detail_profile
            }
          >
            {inpCheck.map((inp, i) => (
              <Input
                key={inp.id}
                id={inp.id}
                ph={inp.ph}
                typeI={inp.type}
                handleFocus={focus}
                val={User[0][i]}
              />
            ))}
          </div>
          <p> {checkout === true ? "SHIPPING INFO" : "ENTER ADDRESS"}</p>
          <div className={style_2.shipping}>
            {inpuShip.map((inp, i) => (
              <Input
                key={inp.id}
                id={inp.id}
                ph={inp.ph}
                typeI={inp.type}
                handleFocus={focus}
                val={User[1][i]}
              />
            ))}
          </div>
          {checkout && (
            <>
              <p>PAYMENT DETAILS </p>
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
            </>
          )}
          <Button style={style.button}>
            {checkout === true ? "CONTINUE & PAY" : "SAVE"}
          </Button>
        </form>
      </div>
      {cartItems.length > 0 && checkout && (
        <div className={style_2.summary}>
          <Cart cart={false} />
        </div>
      )}
    </motion.div>
  );
}

export default UserCheckOut;
