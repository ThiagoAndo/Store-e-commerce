import { useContext } from "react";
import { ProductContext } from "@/store/context/products-context";
import { Menu } from "../userMenu/UserMenu";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
// Style of this component is on global.css
export default function NavMobile() {
  const { data: session } = useSession();

  const ref = useRef();
  const store = useContext(ProductContext);
  const path = usePathname();

  function action() {
    ref.current.checked = !ref.current.checked;
    console.log(ref.current.checked);
  }
  function handleClick(num) {
    store.getFiltered(num);
  }
  return (
    <>
      <input ref={ref} type="checkbox" id="ham-menu" />
      <label htmlFor="ham-menu">
        <div className="hide-des">
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </div>
      </label>
      <div className="full-page-green" onClick={action}></div>
      <div className="ham-menu">
        {session?.user ? (
          <Menu toggle={action} />
        ) : (
          <ul className="centre-text bold-text account" id="account">
            <h2>Account</h2>
            <Link href="/user/login" onClick={action}>
              <li>Sign in</li>
            </Link>
          </ul>
        )}
        {path === "/" ? (
          <ul className="centre-text bold-text filter">
            <h2>Filters</h2>
            <li
              onClick={() => {
                action();
                handleClick(1);
              }}
            >
              Men
            </li>
            <li
              onClick={() => {
                action();
                handleClick(2);
              }}
            >
              Women
            </li>
            <li
              onClick={() => {
                action();
                handleClick(3);
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                action();
                handleClick(4);
              }}
            >
              Self care
            </li>
            <li
              onClick={() => {
                action();
                handleClick(5);
              }}
            >
              Electronics
            </li>
          </ul>
        ) : null}
      </div>
    </>
  );
}
