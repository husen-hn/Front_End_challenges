const contentDiv = document.getElementById("content");
console.log(contentDiv);

let routes = {
  "/": homepage,
  "/index.html": homepage,
  "/contact": contact,
};

window.onpopstate = () => {
  contentDiv.innerHTML = routes[window.location.pathname];
};

let onNavItemClick = (pathName) => {
  window.history.pushState(
    {},
    pathName,
    window.location.origin + "/Front_End_challenges" + pathName
  );
  contentDiv.innerHTML = routes[pathName];
};

contentDiv.innerHTML = routes[window.location.pathname];
