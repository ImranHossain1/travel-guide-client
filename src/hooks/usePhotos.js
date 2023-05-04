import { useQuery } from "react-query";

const usePhotos = () => {
  const { data: photos, isLoading } = useQuery(["photos"], () =>
    fetch("https://travel-guide-server-jex7.onrender.com/photos").then((res) =>
      res.json()
    )
  );
  return [photos, isLoading];
};

export default usePhotos;
