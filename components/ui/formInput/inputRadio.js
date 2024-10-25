import style from "./inputRadio.module.css";
function Radio({ id, lab, onChoice, check, name }) {
  return (
    <div
      className={style.radio + ` ${id === check && style.isClicked}`}
      onClick={onChoice.bind(null, id)}
    >
      <input
        type={"radio"}
        id={id}
        name={name}
        value={id}
        checked={id === check}
        onChange={onChoice.bind(null, id)}
      />
      <label id={`lab${id}`} htmlFor={id}>
        {lab}
      </label>
    </div>
  );
}

export default Radio;
