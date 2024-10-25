import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "@/hooks/useNotification";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { inpuReg } from "@/components/ui/formInput/inputInfo";
import useForm from "@/hooks/useForm";
import Input from "../ui/formInput/input";
import Button from "../ui/button/btn";
import style from "./UserLogin.module.css";
import useMediaScreen from "@/hooks/useMediaScreen";
function UserLogin({ handling, LoginBack }) {
  const { scope, focus, getEvent } = useForm();
  const { notification } = useNotification();
  const { data: session } = useSession();
  const router = useRouter();
  let { match: size } = useMediaScreen(
    "only screen and (min-width : 369px) and (max-width : 500px)"
  );
  const fields = [];
  fields.push(inpuReg[2]);
  fields.push(inpuReg[3]);
  function handleClick(e) {
    e.preventDefault();
    router.replace("/user/signIn");
  }
  function loginHandler(e) {
    const { login, data } = getEvent(e, false, true, false, false);
    login && handling(data);
  }
  useEffect(() => {
    const isOrdering = localStorage.getItem("order");
    if (LoginBack?.message) {
      if (LoginBack.message.slice(0, 5) === "Could") {
        notification(
          null,
          "Not Found:",
          " EMAIL MIGHT NOT BE RIGHT OR USER HAS NOT BEEN REGISTERED"
        );
        return;
      } else if (LoginBack.message.slice(0, 5) === "Wrong") {
        notification(null, "Wrong Input:", "YOUR PASSWORD DOES NOT MATCH.");
        return;
      }
    }
    if (session && !isOrdering) {
      router.replace("/");
    } else if (session && isOrdering) {
      router.replace("/checkout");
    }
  }, [LoginBack, session]);
  return (
    <>
      <AnimatePresence>
        <div className={style.container}>
          <motion.form
            key={2}
            initial={{ x: -15, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className={style.form}
            onSubmit={loginHandler}
            ref={scope}
          >
            <p className={style.paragraph}>Already Registered?</p>
            <div className={style.cont_container}>
              {fields.map((inp) => (
                <Input
                  key={inp.id}
                  id={inp.id}
                  ph={inp.ph}
                  typeI={inp.type}
                  handleFocus={focus}
                />
              ))}
            </div>
            <Button style={style.button}>Sign in Securely </Button>
            {size && (
              <Button click={handleClick} style={style.button}>
                New user
              </Button>
            )}
          </motion.form>
          {!size && (
            <motion.form
              key={4}
              initial={{ x: 15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className={style.form}
            >
              <p className={style.paragraph}>New User?</p>
              <div className={style.cont_container}>
                <h3>✔ Receive special offers and promotions.</h3>
                <h3>✔ Speed your way through checkout.</h3>
                <h3>✔ View your order history and your current addresses.</h3>
                <h3>✔ Access your saved items. </h3>
                <h3>✔ Instant access to your account.</h3>
              </div>
              <Button click={handleClick} style={style.button}>
                Sign up
              </Button>
            </motion.form>
          )}
        </div>
      </AnimatePresence>
    </>
  );
}

export default UserLogin;
