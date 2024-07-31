import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Triangle } from "react-loader-spinner";
import Mounted from "@/components/Accordion/AccordionMounted";
import ErrorComp from "@/components/ui/error/ErrorComp";
import { getUserToken } from "@/helpers/functions";
import NotificationContext from "@/store/context/notification-context";

export function useFetch(get) {
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

function ChangePassword() {
  const { isFetching, error, fetchedData } = useFetch("history");
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();

  if (isFetching) {
    return (
      <div id="loading">
        <Triangle
          visible={true}
          height="300"
          width="300"
          color="#ff9b05"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
  if (error) {
    return <ErrorComp message={error.message} />;
  }
  // if (fetchedData?.length === 0) {
  //   router.replace("/");
  //   notificationCtx.showNotification({
  //     title: "Nothing to show:",
  //     message: `You have not made any purchase.`,
  //     status: "pending",
  //   });
  // }

  if (fetchedData?.length > 0) {
    return <Mounted data={fetchedData} />;
  }
}
export default ChangePassword;
