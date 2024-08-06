import { useDispatch, useSelector } from "react-redux";
import { confActions } from "@/store/redux/conf.slice";
import { cartActions } from "@/store/redux/cart-slice";
import ConIcon from "../ui/confirmation/conf-icon";
import Button from "../ui/button/btn";
import classes from "./confirmation.module.css";
import Anime from "../ui/txtAnime/AnimeComp";
import fetchDelete from "@/helpers/fetchDellete";
import { logoutHandler } from "@/helpers/functions";

const PurchaseConf = function PurchaseConf() {
  const dispatch = useDispatch();
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
      <h1 className={classes.h1}>THANK YOU FOR YOUR ORDER</h1>
      <p className={classes.p}>
        You will receive an email confirmation shortly.
      </p>
      <Button
        style={`${classes.button + " " + classes.btn_conf}`}
        click={handleClick}
      >
        BACK TO HOME
      </Button>
    </div>
  );
};

const DeleteConf = () => {
  const dispatch = useDispatch();

  const handleSkip = () => {
    dispatch(confActions.toggle());
  };

  const handleDelete = async () => {
    const ret = await fetchDelete();
    if (ret) {
      logoutHandler();
    }
  };

  return (
    <div
      className={`${classes.container + " " + classes.deletion}`}
      id={"deletion"}
    >
      <Anime
        isError={false}
        isMsn={false}
        isDelete={true}
        message={"Are you sure ?"}
      />
      <hr />
      <h2>This action can not be undone!</h2>
      <div className={classes.btn_container}>
        <Button click={handleSkip} style={classes.button}>
          Skip
        </Button>
        <Button
          click={handleDelete}
          style={`${classes.button + " " + classes.btn_delete}`}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

function ConfBlock() {
  const msnType = useSelector((state) => state.conf.confType);
  if (msnType === "conf") {
    return <PurchaseConf />;
  } else {
    return <DeleteConf />;
  }
}

export default ConfBlock;
