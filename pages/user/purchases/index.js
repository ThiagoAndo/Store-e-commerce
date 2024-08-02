import { useState, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import Mounted from "@/components/purchaseAccordion/AccordionMounted";
import Anime from "@/components/ui/txtAnime/AnimeComp";
import { getUserToken } from "@/helpers/functions";
export function useFetch(get, cartId) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState();

  useEffect(() => {
    async function fetchData() {
      const token = getUserToken();
      const id = localStorage.getItem("id");
      let url = null;
      if (get === "history") {
        url = `https://libraryapi-gtct.onrender.com/order/${id}`;
      } else {
        url = `https://libraryapi-gtct.onrender.com/cart/purchased/params?user_id=${id}&cart_id=${cartId}`;
      }
      setIsFetching(true);
      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch user purchases");
        } else {
          setFetchedData(data);
        }
      } catch (error) {
        setError({ message: "Failed to fetch user purchases!" });
      }

      setIsFetching(false);
    }

    fetchData();
  }, []);

  return {
    isFetching,
    fetchedData,
    error,
  };
}

function PurchaseHistory() {
  const { isFetching, error, fetchedData } = useFetch("history");

  if (isFetching) {
    return (
      <div id="loading">
        <Triangle
          visible={true}
          height="300"
          width="300"
          color="#ff9b05"
          ariaLabel="triangle-loading"
        />
      </div>
    );
  }
  if (error) {
    return (
      <Anime
        isError={true}
        isMsn={false}
        isDelete={false}
        message={error.message}
      />
    );
  }

  if (fetchedData?.length > 0) {
    return <Mounted data={fetchedData} />;
  } else {
    return (
      <Anime
        message={"Nothing to show!"}
        isError={false}
        isMsn={true}
        isDelete={false}
      />
    );
  }
}
export default PurchaseHistory;
