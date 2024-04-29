export function getCurrentDate() {
  const date = new Date();
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

export function isPasswordValid(password) {
  if (password.trim().length >= 8) {
    return true;
  } else {
    return false;
  }
}

export function formatValue(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function setStorage(data) {
  localStorage.setItem("id", data.id);
  localStorage.setItem("email", data.email_address);
  localStorage.setItem("name", data.first_name + " " + data.last_name);

  if (data?.address) localStorage.setItem("n", data.id);
}

export function gatherData(e) {
  let entries = [];
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  for (const property in data) {
    entries.push(data[property].trim().toLowerCase());
  }
  return {
    entries,
    data,
  };
}
