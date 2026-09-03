"use client";

import { useEffect, useState } from "react";

const ALLOWED_COUNTRIES = ["DE", "AT", "DK"];

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function usePriceVisible() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const country = getCookie("shipCountry");
    if (country && !ALLOWED_COUNTRIES.includes(country)) {
      setVisible(false);
    }
  }, []);

  return visible;
}
