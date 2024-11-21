import style from "./input.module.css";
import { useRef, useState, useEffect } from "react";

export default function Input({
  id, // Unique identifier for the input field
  ph, // Placeholder text for the input
  typeI, // Input type (e.g., text, password, email)
  handleFocus, // Optional focus handler function
  dis = false, // Boolean to disable the input field (default: false)
  val, // Initial value for the input
}) {
  // State to manage the current value of the input field
  const [thisVal, setThisVal] = useState(val);

  // Reference to the input element
  const thisRef = useRef();

  // Generate label from the `id` (e.g., "billing_address" -> "Billing Address")
  let label = id.split("_");
  label =
    label.length > 1
      ? label
          .map((word) => word[0].toUpperCase() + word.slice(1)) // Capitalize each word
          .join(" ") // Join words with a space
      : id[0].toUpperCase() + id.slice(1); // Capitalize a single word

  // Handle changes to the input value and update state
  const handleChange = () => {
    setThisVal(thisRef.current.value); // Set the current input value to state
  };

  // Update the input value when the `val` prop changes
  useEffect(() => {
    setThisVal(val);
  }, [val]);

  return (
    <div>
      {/* Render label for the input field */}
      <label className={style.label} htmlFor={id} id={`lab${id}`}>
        {label}
      </label>
      {/* Render input field */}
      <input
        ref={thisRef} // Attach the reference to the input element
        id={id} // Set the unique identifier
        name={id} // Set the name attribute
        className={style.input} // Apply input-specific styles
        placeholder={ph} // Set the placeholder text
        type={typeI} // Set the input type
        onFocus={handleFocus || handleChange} // Trigger focus handler or fallback to handleChange
        disabled={dis} // Disable input if `dis` is true
        defaultValue={thisVal || ""} // Set the default value for the input
        onChange={handleChange} // Update state when input value changes
      />
    </div>
  );
}
