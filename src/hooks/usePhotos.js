import { useQuery } from "react-query";

const usePhotos = () => {
  const { data: photos, isLoading } = useQuery(["photos"], () =>
    fetch("https://travel-guide-server-production.up.railway.app/photos").then(
      (res) => res.json()
    )
  );
  return [photos, isLoading];
};

export default usePhotos;
