import style from "./input.module.css";
import { useInputAnimation } from "@/hooks/useInput";

export default function Input({ id, ph, typeI, handleFocus, dis = false, val }) {
  let label = id.split("_");
  const { focus, scope } = useInputAnimation();

  label =
    label.length > 1
      ? label[0][0].toUpperCase() +
        label[0].slice(1, label[0].length) +
        " " +
        label[1][0].toUpperCase() +
        label[1].slice(1, label[0].length + 1)
      : id[0].toUpperCase() + id.slice(1, id.length);

  return (
    <div>
      <label className={style.label} htmlFor={id} id={`lab${id}`}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        className={style.input}
        placeholder={ph}
        type={typeI}
        onFocus={handleFocus}
        disabled={dis}
        value={val}
      />
    </div>
  );
}
