import { useAnimate, stagger } from "framer-motion";
export function useInputAnimation() {
  const [scope, animate] = useAnimate();
  function handleFocus(e) {
    const myTarget = "#" + e.target.id;
    const labelTarget = "#lab" + e.target.id;
    animate(
      myTarget,
      { color: "#142020", borderColor: "#000000" },
      { type: "spring", duration: 0.2 }
    );
    animate(
      labelTarget,
      { color: "#000000" },
      { type: "spring", duration: 0.2 }
    );
  }

  function handleEmpty({ label, input }) {
    console.log(input + " " + label);
    animate(
      "#" + input,
      { x: [-15, 0, 15, 0], borderColor: "#FA8072" },
      { duration: 0.2, delay: stagger(0.05) }
    );

    animate(
      "#" + label,
      { color: ["#FA8072", "#f84a36", "#FA8072"], fontWeight:[400,700,400 ] },
      { duration: 0.3, delay: stagger(0.05) }
    );
  }

  return {
    focus: handleFocus,
    empty: handleEmpty,
    scope,
  };
}
