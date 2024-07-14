export function getCurrentDate() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let currentDate = `${Number(day) < 10 ? 0 : ""}${day}-${
    Number(month) < 10 ? 0 : ""
  }${month}-${year}h${new String(new Date(Date.now()))
    .slice(15, 24)
    .replaceAll(" ", "")}`;

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

export function setStorage(data, call = null) {
  localStorage.setItem("id", data.id);
  localStorage.setItem("email", data.email_address);
  localStorage.setItem("first", data.first_name);
  localStorage.setItem("last", data.last_name);
  if (call === null) localStorage.setItem("token", data.token);
}

export function getUserToken() {
  return localStorage.getItem("token");
}

export async function setAdd(id) {
  try {
    let response = await fetch(
      // `http://localhost:8080/add/${id}`
      `https://libraryapi-gtct.onrender.com/add/${id}`
    );

    if (response.ok) {
      const [resp] = await response.json();
      if (!response?.message) {
        adrStorage(resp);
      }
    }
  } catch (error) {
    return { error: "Connecting to the database failed!" };
  }
}

export function adrStorage(resp) {
  localStorage.setItem("line_one", resp.line_one);
  localStorage.setItem("line_two", resp.line_two);
  localStorage.setItem("town_city", resp.town_city);
  localStorage.setItem("constry_state", resp.constry_state);
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

export function getStorageUser() {
  return {
    user: [
      localStorage.getItem("first"),
      localStorage.getItem("last"),
      localStorage.getItem("email"),
    ],
    add: [
      localStorage.getItem("line_one"),
      localStorage.getItem("line_two"),
      localStorage.getItem("town_city"),
      localStorage.getItem("constry_state"),
    ],
  };
}
