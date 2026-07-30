"use client";

import { useEffect } from "react";

export default function WorksPage() {
  useEffect(() => {
    window.location.replace("/#experience");
  }, []);

  return null;
}
