import style from "./formInput.module.css";

export default function Input({ id, ph, typeI ,handleFocus }) {
  let label = id.split("_");

  label =
    label.length > 1
      ? label[0][0].toUpperCase() +
        label[0].slice(1, label[0].length) +
        " " +
        label[1][0].toUpperCase() +
        label[1].slice(1, label[0].length+1)
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
      />
    </div>
  );
}
