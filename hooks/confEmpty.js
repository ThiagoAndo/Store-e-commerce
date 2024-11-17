import { gatherData } from "@/helpers/functions";
import { useInputAnimation } from "@/hooks/useInput";

// This hook is responsible for detecting empty fields across all forms in the application
export default function useConfEmpty() {
  const { focus, empty, scope } = useInputAnimation();


  function confEmpty(e, inputs) {
    let checkEmpty = 0;
    const { entries } = gatherData(e);
    // console.log(inputs.length);
    // console.log(inputs.length);
    // console.log("entries.length");
    // console.log(entries);
    entries.map((fields, i) => {
      console.log(inputs[i].input);
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

  

    return checkEmpty !== 0;
  }

  return {
    scope,
    focus,
    isEmpty: confEmpty,
  };
}
