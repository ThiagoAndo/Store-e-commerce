/**
 * Validates form fields based on the provided configurations.
 * - Checks for empty values.
 * - Validates specific fields such as email, password, first name, and last name.
 * - Stops validation at the first invalid field and displays an error message.
 *
 * @param {Object} params - The parameters for validation.
 * @param {Event} params.e - The form submission event.
 * @param {Array} params.fields - Array of field configurations to validate.
 * @param {Function} params.empty - Callback to mark a field as empty.
 * @returns {Object} - Returns validation status and collected form data.
 */

import { useNotification } from "@/hooks/useNotification";
import { gatherData } from "@/helpers/functions";
import { isEmailValid, isPasswordValid } from "@/helpers/functions";
export default function useCheckForm() {
  // Hook for displaying notifications to provide user feedback
  const { notification } = useNotification();
  const isValid = ({ e, fields, empty }) => {
    e.preventDefault(); // Prevents default form submission behavior
    const { data } = gatherData(e); // Extracts form data into a structured object
    let isOk = true; // Flag to track overall validation status
    let i = 0;
    // Iterates through fields and validates them one by one
    while (i < fields.length) {
      switch (fields[i].input) {
        case "first_name":
          const name = data.first_name.trim().split(" ");
          // Validates that "first_name" is a single-word name
          if (name.length > 1) {
            notification("first"); // Displays notification for invalid input
            empty(fields[i]); // Marks the field as empty
            isOk = false;
            i = 1000; // Stops further validation
          }
          break;
        case "last_name":
          const last = data.last_name.trim().split(" ");
          // Validates that "last_name" is a single-word name
          if (last.length > 1) {
            notification("last");
            empty(fields[i]);
            isOk = false;
            i = 1000;
          }
          break;
        case "email_address":
          // Validates email format
          if (!isEmailValid(data.email_address)) {
            notification("email");
            empty(fields[i]);
            isOk = false;
            i = 1000;
          }
          break;
        case "password":
          // Validates password strength
          if (!isPasswordValid(data.password)) {
            notification("password");
            empty(fields[i]);
            isOk = false;
            i = 1000;
          }
          break;
      }
      i++;
    }

    return { isOk, data }; // Returns validation status and collected form data
  };

  return { isValid }; // Exposes the isValid function for use in components
}
