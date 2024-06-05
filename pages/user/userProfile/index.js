import {
  inpuShip,
  inpuPay,
  inpuReg,
  fieldChekout,
} from "@/components/ui/formInput/inputInfo";

import UserCheckOut from "@/components/forms/UserCheckout";
function handleCheck() {
  console.log("save");
}
const inpCheck = [inpuReg[0], inpuReg[1], inpuReg[3]];
function ChangeData() {
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
