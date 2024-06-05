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


  function handleCheck(data, whatChange) {
    if (whatChange.length === 0) {
      notification(null, "Invalid Action:", "USER DETAILS HAVE NOT CHANGED", "error");
    }

    console.log(data);
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
