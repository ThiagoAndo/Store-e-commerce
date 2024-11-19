import { gatherData } from "@/helpers/functions";
import { useInputAnimation } from "@/hooks/useInput";
import { useNotification } from "@/hooks/useNotification";

// This hook is responsible for detecting empty fields across all forms in the application
export default function useConfEmpty() {
  const { focus, empty, scope } = useInputAnimation();
  const { notification } = useNotification();
  function confEmpty(e, inputs) {
    let checkEmpty = 0;
    const { entries } = gatherData(e);
    entries.map((fields, i) => {
      focus({
        target: {
          id: inputs[i].input,
        },
      });
    });

    entries.map((field, i) => {
      if (field === "") {
        empty(inputs[i]);
        checkEmpty++;
      }
    });

    if (checkEmpty > 0) {
      notification(null, "Empty Fields:", `FILL IN THE FORM`, "error");
    }
    return checkEmpty !== 0;
  }

  return {
    empty,
    scope,
    focus,
    isEmpty: confEmpty,
  };
}
