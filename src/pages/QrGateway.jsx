import { useEffect } from "react";
import { getAdminBaseUrl } from "../config/appConfig";

export default function QrGateway() {
  useEffect(() => {
    const adminBase = getAdminBaseUrl();
    window.location.replace(`${adminBase}${window.location.pathname}${window.location.search}`);
  }, []);

  return <div style={{ padding: 40, textAlign: "center" }}>Opening FAA verification…</div>;
}
