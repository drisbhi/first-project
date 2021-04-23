const api = `https://randomuser.me/api`;
const sortBtn = document.getElementById("sort-des");
const sortBtn2 = document.getElementById("sort-asc");
const adduser = document.getElementById("user-btn");
const userlist = document.getElementById("user-list");
const searchinput = document.getElementById("search");

const appstate = [];
class User {
  constructor(title, firstname, lastname, gender, email) {
    this.title = `${title}`;
    this.name = `${firstname} ${lastname}`;
    this.email = email;
    this.gender = gender;
  }
}

adduser.addEventListener("click", async () => {
  const userdata = await fetch(api, {
    method: "GET"
  });

  const userJson = await userdata.json();

  const user = userJson.results[0];
  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );
  appstate.push(classUser);
  //appstate.push(user);

  domRender(appstate);
});

const domRender = (stateArr) => {
  userlist.innerHTML = null;
  stateArr.forEach((userobj) => {
    const userElement = document.createElement("div");
    userElement.innerHTML = `<div>
  ${userobj.title} ${userobj.name} 
  <ol>
  <li>${userobj.gender} </li>
  <li>${userobj.email} </li>
  </ol>
  </div>`;

    userlist.appendChild(userElement);
  });
};

searchinput.addEventListener("keyup", (e) => {
  console.log(e, searchinput.value.toLowerCase());

  const filteredAppstate = appstate.filter(
    (user) =>
      user.name.toLowerCase().includes(searchinput.value.toLowerCase()) ||
      // user.name.last.toLowerCase().includes(searchinput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchinput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchinput.value.toLowerCase())
  );
  domRender(filteredAppstate);
});
sortBtn.addEventListener("click", () => {
  const appStateCopy = [...appstate];
  appStateCopy.sort((a, b) => (a.name < b.name ? 1 : -1));
  domRender(appStateCopy);
});

sortBtn2.addEventListener("click", () => {
  const appStateCopy = [...appstate];
  appStateCopy.sort((a, b) => (a.name > b.name ? 1 : -1));
  domRender(appStateCopy);
});

