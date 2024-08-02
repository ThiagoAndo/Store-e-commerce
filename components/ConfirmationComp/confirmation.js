import { useRouter } from "next/router";
import { cartActions } from "@/store/redux/cart-slice";
import { confActions } from "@/store/redux/conf.slice";
import { useDispatch, useSelector } from "react-redux";
import ConIcon from "../ui/confirmation/conf-icon";
import Button from "../ui/button/btn";
import classes from "./confirmation.module.css";
import Anime from "../ui/txtAnime/AnimeComp";

const PurchaseConf = function PurchaseConf() {
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
  const msnType = useSelector((state) => state.conf.confType);
  if (msnType === "conf") {
    return <PurchaseConf />;
  } else {
    return (
      <div className={classes.container} id={"deletion"}>
        <Anime
          isError={false}
          isMsn={false}
          isDelete={true}
          message={"Are you sure ?"}
        />
        ;
      </div>
    );
  }
}

export default ConfBlock;
