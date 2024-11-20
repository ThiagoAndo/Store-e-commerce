import { gatherData } from "@/helpers/functions";
import { useInputAnimation } from "@/hooks/useInput";
import { useNotification } from "@/hooks/useNotification";
/**
 * This hook is responsible for detecting empty fields across all forms in the application.
 * It highlights empty inputs, triggers error animations, and displays a notification
 * when validation fails.
 */
export default function useConfEmpty() {
  // Custom hooks for handling input animations and notifications
  const { focus, empty, scope } = useInputAnimation();
  const { notification } = useNotification();
  /**
   * Validates form inputs for empty fields:
   * - Highlights fields with missing values.
   * - Animates focus on all input fields for visual feedback.
   * - Triggers a notification if any field is empty.
   *
   * @param {Event} e - The form submission event.
   * @param {Array} inputs - Array of input configurations to validate.
   * @returns {Boolean} - Returns true if any fields are empty, false otherwise.
   */
  function confEmpty(e, inputs) {
    let checkEmpty = 0; // Counter for tracking empty fields
    const { entries } = gatherData(e); // Extracts form entries
    // Animates focus on all inputs (provides visual feedback for users)
    entries.map((_, i) => {
      focus({
        target: {
          id: inputs[i].input,
        },
      });
    });

    // Checks for empty fields and triggers animations for invalid inputs
    entries.map((field, i) => {
      if (field === "") {
        empty(inputs[i]); // Triggers animation for the empty field
        checkEmpty++; // Increments counter for each empty field
      }
    });

    // Displays a notification if all fields are empty
    if (checkEmpty > 0) {
      notification(null, "Empty Fields:", "Please, fill in the form.", "error");
    }
    // Returns true if any fields are empty, otherwise false
    return checkEmpty !== 0;
  }

  return {
    empty, // Animation trigger for empty inputs
    scope, // Reference for form validation scope
    focus, // Animation handler for input focus
    isEmpty: confEmpty, // Main validation function for checking empty fields
  };
}
