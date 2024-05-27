import style from "./input.module.css";
import { useRef, useState, useEffect } from "react";
export default function Input({
  id,
  ph,
  typeI,
  handleFocus,
  dis = false,
  val,
}) {
  const [thisVal, setThisVal] = useState();
  let label = id.split("_");
  const thisRef = useRef();
  const handleChange = () => {
    setThisVal(thisRef.current.value);
  };

  label =
    label.length > 1
      ? label[0][0].toUpperCase() +
        label[0].slice(1, label[0].length) +
        " " +
        label[1][0].toUpperCase() +
        label[1].slice(1, label[0].length + 1)
      : id[0].toUpperCase() + id.slice(1, id.length);

  useEffect(() => {
    setThisVal(val);
  }, [val]);

  return (
    <div>
      <label className={style.label} htmlFor={id} id={`lab${id}`}>
        {label}
      </label>
      <input
        ref={thisRef}
        id={id}
        name={id}
        className={style.input}
        placeholder={ph}
        type={typeI}
        onFocus={handleFocus && handleChange}
        disabled={dis}
        value={thisVal}
        onChange={handleChange}
      />
    </div>
  );
}
