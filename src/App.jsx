import React from "react";
import { useReducedMotion } from "framer-motion";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Work } from "./components/Work";
<<<<<<< HEAD
import { Capabilities } from "./components/Capabilities";
=======
>>>>>>> e9237e5f20fbb7e86293069e38af8b32bf20ec37

export function App() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav />
      <main id="main-content" tabIndex="-1">
        <Hero reduceMotion={reduceMotion} />
        <Work />
<<<<<<< HEAD
        <Capabilities />
=======
>>>>>>> e9237e5f20fbb7e86293069e38af8b32bf20ec37
      </main>
    </>
  );
}
