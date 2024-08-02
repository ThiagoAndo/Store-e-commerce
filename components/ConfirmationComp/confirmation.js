import ConIcon from "../ui/confirmation/conf-icon";
import Button from "../ui/button/btn";
import classes from "./confirmation.module.css";
import { useRouter } from "next/router";
import { confActions } from "@/store/redux/conf.slice";
import { cartActions } from "@/store/redux/cart-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const PurchaseConf = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClick = () => {
    dispatch(confActions.toggle());
    dispatch(cartActions.removeAll());
    router.replace("/");
  };
  return (
    <div className={classes.container}>
      <span>
        <ConIcon />
      </span>
      <h1>THANK YOU FOR YOUR ORDER</h1>
      <p>You will receive an email confirmation shortly.</p>
      <Button style={classes.button} click={handleClick}>
        BACK TO HOME
      </Button>
    </div>
  );
};

const DeleteConf = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(confActions.toggle());
  };
  return <button onClick={handleClick}></button>;
};

function ConfBlock() {
  const conf = useSelector((state) => state.conf.confType);
console.log(conf);
console.log("conf");
  if (conf === "conf") {
    return (
      <div className={classes.container}>
        <h1>Confirmation</h1>;
      </div>
    );
  } else {
    return (
      <div className={classes.container}>
        <h1>delete</h1>;
      </div>
    );
  }
}

export default ConfBlock;
