import { useEffect } from "react";
import { useAddPageDetailsMutation } from "../features/pageDetails/pageDetails";
import { useLocation } from "react-router-dom";

export default function usePagesDetails() {
  const location = useLocation();
  const [addPageDetails, { data }] = useAddPageDetailsMutation();
  const url = {
    page_url: location?.pathname,
  };
  useEffect(() => {
    addPageDetails(url);
  }, []);
  if (data != undefined) return data;
}
