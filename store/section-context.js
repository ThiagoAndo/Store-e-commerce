import { createContext, useState, useEffect } from "react";

export const SectionContext = createContext({
  context: null,
  setContext: function (section) {},
});

export function SectionContextProvider(props) {
  const [section, setSection] = useState();

  function setContext(section) {
    setSection(section);
  }

  const context = {
    section,
    setSection: setContext,
  };

  return (
    <SectionContext.Provider value={context}>
      {props.children}
    </SectionContext.Provider>
  );
}

export default SectionContextProvider;
