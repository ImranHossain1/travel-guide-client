import React from "react";
import { useQuery } from "react-query";

const useDestinations = () => {
  const { data: destinations, isLoading } = useQuery(["destinations"], () =>
    fetch(
      "https://travel-guide-server-production.up.railway.app/destination"
    ).then((res) => res.json())
  );
  return [destinations, isLoading];
};

export default useDestinations;
