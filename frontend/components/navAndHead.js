import { useState } from 'react';
import Navbar from "../components/navbar";
import Header from "../components/header";

export default function ({ setParameter, selectedParams }) {

  const [navBarState, setNavBarState] = useState(false);

  return (
    <>
      <Header setParameter={setParameter} selectedParams={selectedParams} 
        navBarState={navBarState} setNavBarState={setNavBarState}
      />

      <Navbar setParameter={setParameter} selectedParams={selectedParams} 
        navBarState={navBarState} setNavBarState={setNavBarState}
      />
    </>
  );
}