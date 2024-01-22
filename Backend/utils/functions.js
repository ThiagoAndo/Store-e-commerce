export default function getCurrentDate() {
  const date = new Date("2024-12-23");
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let currentDate = `${Number(day) < 10 ? 0 : ""}${day}-${
    Number(month) < 10 ? 0 : ""
  }${month}-${year}  ${new String(new Date(Date.now())).slice(15, 24)}`;

  return currentDate;
}

export function isEmailValid(email) {
  let match = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(match)) {
    return true;
  } else {
    return false;
  }
}

export function isNameValid(name) {
  let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  if (!regName.test(name)) {
    return false;
  } else {
    return true;
  }
}

export function isPasswordValid(password){
  if (password.trim().length >=8) {
    return true;
  } else {
    return false;
  }
}
