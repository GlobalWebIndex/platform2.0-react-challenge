import { useState, useEffect } from "react";

export default function useCopyURL() {
  const [copied, setCopied] = useState(false);

  const copyURLToCLipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(window.location.href);
  };

  useEffect(() => {
    let timer;
    if (copied) {
      timer = setTimeout(() => setCopied(false), 1500);
    }
    return () => clearTimeout(timer);
  }, [copied]);

  return [copied, copyURLToCLipboard];
}
