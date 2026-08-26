import { useEffect } from "react";

export default function QrGateway() {
  useEffect(() => {
    const adminBase = (
      import.meta.env.VITE_ADMIN_BASE_URL ||
      (window.location.hostname === "localhost" ? "http://localhost:3000" : "https://cms.faa-dubd.org")
    ).replace(/\/+$/, "");
    window.location.replace(`${adminBase}${window.location.pathname}${window.location.search}`);
  }, []);

  return <div style={{ padding: 40, textAlign: "center" }}>Opening FAA verification…</div>;
}
