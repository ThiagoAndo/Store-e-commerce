import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "@/hooks/useNotification";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { inpuLogin, logIn } from "@/helpers/inputInfo";
import useCheckForm from "@/hooks/useCheckForm";
import Input from "./formInput/input";
import Button from "../ui/button/btn";
import style from "./UserLogin.module.css";
import useMediaScreen from "@/hooks/useMediaScreen";
import useConfEmpty from "@/hooks/useConfEmpty";
/**
 * UserLogin Component
 * Handles user authentication by rendering a login form for existing users
 * Validates user input, manages session
 * and routing, and dynamically adjusts the UI based on screen size.
 */
function UserLogin({ handling, LoginBack }) {
  const { scope, focus, isEmpty, empty } = useConfEmpty();
  const { isValid } = useCheckForm();
  const { notification } = useNotification();
  const { data: session } = useSession();
  const router = useRouter();
  let { match: size } = useMediaScreen(
    "only screen and (min-width : 369px) and (max-width : 500px)"
  );
  /**
   * Redirects new users to the sign-up page.
   */
  function handleClick(e) {
    e.preventDefault();
    router.replace("/user/signIn");
  }
  /**
   * Validates login form inputs and triggers the parent handler with valid data.
   */
  function loginHandler(e) {
    e.preventDefault();
    let isOk, data;
    const emp = isEmpty(e, logIn);
    if (!emp) {
      ({ isOk, data } = isValid({ e, fields: logIn, empty }));
    }
    if (isOk) handling(data);
  }

  useEffect(() => {
    const isOrdering = localStorage.getItem("order");

    // Displays appropriate error messages based on login feedback
    if (LoginBack?.message) {
      if (LoginBack.message.startsWith("Could")) {
        notification(
          null,
          "Not Found:",
          "Email might be incorrect, or the user is not registered."
        );
        return;
      } else if (LoginBack.message.startsWith("Wrong")) {
        notification(null, "Wrong Input:", "Incorrect password.");
        return;
      }
    }

    // Redirects authenticated users based on their ordering status
    if (session) {
      router.replace(isOrdering ? "/checkout" : "/");
    }
  }, [LoginBack, session]);

  return (
    <>
      <AnimatePresence>
        <div className={style.container}>
          {/* Login form for existing users */}
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
              {/* Render login input fields dynamically */}
              {inpuLogin.map((inp) => (
                <Input
                  key={inp.id}
                  id={inp.id}
                  ph={inp.ph}
                  typeI={inp.type}
                  handleFocus={focus}
                />
              ))}
            </div>
            <Button style={style.button}>Sign in Securely</Button>
            {/* Show "New User" button on smaller screens */}
            {size && (
              <Button click={handleClick} style={style.button}>
                New user
              </Button>
            )}
          </motion.form>

          {/* Registration information and button for new users */}
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
