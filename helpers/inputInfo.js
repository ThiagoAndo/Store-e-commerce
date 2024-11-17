// These arrays are defined to hold the input data, which are then used to
// dynamically render the form fields in the JSX using the map() method.
export const inpuLogin = [
  {
    id: "email_address",
    ph: "e.g. stephenking@lorem.com",
    type: "text",
  },
  {
    id: "password",
    ph: "Minimum of eight characters",
    type: "password",
  },
];
export const inpuReg = [
  {
    id: "first_name",
    ph: "e.g. Stephen",
    type: "text",
  },
  {
    id: "last_name",
    ph: "e.g. King",
    type: "text",
  },
  {
    id: "email_address",
    ph: "e.g. stephenking@lorem.com",
    type: "text",
  },
  {
    id: "password",
    ph: "Minimum of eight characters",
    type: "password",
  },
];

export const inpuShip = [
  {
    id: "line_one",
    ph: "e.g. 156 ashgrove",
    type: "text",
  },
  {
    id: "line_two",
    ph: "e.g cookstown",
    type: "text",
  },
  {
    id: "town_city",
    ph: "e.g. Dublin 12",
    type: "text",
  },
  {
    id: "constry_state",
    ph: "e.g. Dublin",
    type: "text",
  },
];

export const inpuPay = [
  {
    id: "e-Money_Number",
    ph: "234678894",
    type: "number",
  },
  {
    id: "e-Money_PIN",
    ph: "6743",
    type: "number",
  },
];

// These variables are utilized within the useForm hookPropertyMap, located in the
// hooks faOldRepublic. They assist in detecting empty fields and providing user
// feedback through validaditon message

export const logIn = [
  { label: "labemail_address", input: "email_address" },
  { label: "labpassword", input: "password" },
];


export const fieldRegister = [
  { label: "labfirst_name", input: "first_name" },
  { label: "lablast_name", input: "last_name" },
  { label: "labemail_address", input: "email_address" },
  { label: "labpassword", input: "password" },
];

export const fieldChekout = [
  ...fieldRegister.slice(0, 3),
  { label: "labline_one", input: "line_one" },
  { label: "labline_two", input: "line_two" },
  { label: "labtown_city", input: "town_city" },
  { label: "labconstry_state", input: "constry_state" },
  { label: "labe-Money_PIN", input: "e-Money_PIN" },
  { label: "labe-Money_Number", input: "e-Money_Number" },
];

export const fieldProfile = [
  { label: "labfirst_name", input: "first_name" },
  { label: "lablast_name", input: "last_name" },
  { label: "labemail_address", input: "email_address" },
  { label: "labline_one", input: "line_one" },
  { label: "labline_two", input: "line_two" },
  { label: "labtown_city", input: "town_city" },
  { label: "labconstry_state", input: "constry_state" },
];
