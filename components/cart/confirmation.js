import ConIcon from "../ui/confirmation/conf-icon";
import Button from "../ui/button/btn";
import classes from "./confirmation.module.css";
import { useRouter } from "next/router";
import { confActions } from "@/store/redux/conf.slice";
import { cartActions } from "@/store/redux/cart-slice";
import { useDispatch } from "react-redux";

function ConfBlock() {
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
}

export default ConfBlock;
