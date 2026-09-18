import React from "react";
import { useReducedMotion } from "framer-motion";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Work } from "./components/Work";
import { Capabilities } from "./components/Capabilities";
import { Changelog, Contact, Footer, Method } from "./components/Journey";

export function App() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav />
      <main id="main-content" tabIndex="-1">
        <Hero reduceMotion={reduceMotion} />
        <Work />
        <Capabilities />
        <Method />
        <Changelog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
