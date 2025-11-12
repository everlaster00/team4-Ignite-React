"use client";

import { useState } from "react";
import Landing from "./landing";

export default function AjeaLayout({ children }) {
  const [showLanding, setShowLanding] = useState(true);

  return showLanding ? (
    <Landing onFinish={() => setShowLanding(false)} />
  ) : (
    children
  );
}
