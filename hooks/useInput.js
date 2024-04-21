import { useAnimate, stagger } from "framer-motion";
export function useInputAnimation() {
  const [scope, animate] = useAnimate();
  function handleFocus(e) {
    const myTarget =  "#" + e.target.id;
    const labelTarget = "#lab" + e.target.id;
    animate(
      myTarget,
      { background: "#ddd6cb", color: "#142020" },
      { type: "spring", duration: 0.2 }
    );
    animate(
      labelTarget,
      { color: "#000000" },
      { type: "spring", duration: 0.2 }
    );
  }

  function handleEmpty({ label, input }) {
    animate(
      "#" + input,
      { x: [-10, 0, 10, 0], background: "#FA8072", color: "#FA8072" },
      { type: "spring", duration: 0.3, delay: stagger(0.05) }
    );

    animate(
      "#" + label,
      { x: [-10, 0, 10, 0], color: "#FA8072" },
      { type: "spring", duration: 0.3, delay: stagger(0.05) }
    );
  }

  return {
    focus: handleFocus,
    empty: handleEmpty,
    scope,
  };
}
