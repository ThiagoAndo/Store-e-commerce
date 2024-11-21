import img from "@/assets/icon-thank-you.svg";
import Image from "next/image";
const Conf = () => {
  return (
    <section id={"finishd"} class={"grid_month addOn"}>
      <Image
        src={img}
        alt={"logo"}
        fill
        onError={() => console.error(`Failed to load image purchaseConf: ${img}`)}
      />
      <div className={"holdLabel"}>
        <h1 className={"h1"}>Thank you!</h1>
        <p>
          Thanks for confirming your purchase! We hope you have fun using our
          platform. If you ever need support, please feel free to email us at
          support@nextstore.com
        </p>
      </div>
    </section>
  );
};

export default Conf;
