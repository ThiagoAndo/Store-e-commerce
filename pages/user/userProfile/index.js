import {
  inpuShip,
  inpuPay,
  inpuReg,
  fieldChekout,
} from "@/components/ui/formInput/inputInfo";
import { useNotification } from "@/hooks/useNotification";

import UserCheckOut from "@/components/forms/UserCheckout";

const inpCheck = [inpuReg[0], inpuReg[1], inpuReg[2]];
function ChangeData() {
  const { notification } = useNotification();

  async function handleCheck(data, whatChange) {
    if (whatChange.length === 0) {
      notification(
        null,
        "Invalid Action:",
        "USER DETAILS HAVE NOT CHANGED",
        "error"
      );
    }

    const isFetch = inpuReg.map((inp, i) => {
      if (inp.id === whatChange[i]) return true;
      else return;
    });
    console.log(whatChange);
  }

  return (
    <UserCheckOut
      handleSubmit={handleCheck}
      inpuShip={inpuShip}
      inpuPay={inpuPay}
      inpCheck={inpCheck}
      fieldChekout={fieldChekout}
      checkout={false}
      profile={true}
    />
  );
}
export default ChangeData;
