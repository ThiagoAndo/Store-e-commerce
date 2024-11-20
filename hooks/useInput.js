// This hook integrates the useAnimate hook with input fields to handle animation effects.
// It provides methods to:
// - Highlight input fields on focus.
// - Trigger error animations for empty or invalid fields.
import { useAnimate, stagger } from "framer-motion";
export function useInputAnimation() {
  // useAnimate hook for controlling animations
  const [scope, animate] = useAnimate();
  /**
   * Handles focus animation for input fields:
   * - Changes input border and label color when focused.
   *
   * @param {Event} e - The focus event from the input field.
   */
  function handleFocus(e) {
    const myTarget = "#" + e.target.id; // Target input field by ID
    const labelTarget = "#lab" + e.target.id; // Target associated label by ID

    // Animates input field border and text color
    animate(
      myTarget,
      { color: "#142020", borderColor: "#000000" },
      { type: "spring", duration: 0.2 }
    );

    // Animates label color
    animate(
      labelTarget,
      { color: "#000000" },
      { type: "spring", duration: 0.2 }
    );
  }
  /**
   * Handles animation for empty input fields:
   * - Shakes the input field to indicate an error.
   * - Changes the label's color and font weight to emphasize the error.
   *
   * @param {Object} param - Object containing input and label IDs.
   * @param {string} param.input - ID of the input field.
   * @param {string} param.label - ID of the associated label.
   */
  function handleEmpty({ label, input }) {
    // Shake animation for the input field
    animate(
      "#" + input,
      { x: [-15, 0, 15, 0], borderColor: "#FA8072" },
      { duration: 0.2, delay: stagger(0.05) }
    );

    // Color and weight animation for the label
    animate(
      "#" + label,
      { color: ["#FA8072", "#f84a36", "#FA8072"], fontWeight: [400, 700, 400] },
      { duration: 0.3, delay: stagger(0.05) }
    );
  }

  return {
    focus: handleFocus, // Animation for focused input fields
    empty: handleEmpty, // Animation for empty input fields
    scope, // Scope required for animation targeting
  };
}
