/* globals Chart:false, feather:false */

const profileimg = document.querySelector(".user-image"),
logout = document.querySelector(".log-out"),
profilename = document.querySelector(".profile-name"),
profilerole = document.querySelector(".profile-role"),
makenavitem = (vendormenu) => {
  // debugger;
  const navitem = document.createElement("li"),
    navlink = document.createElement("a"),
    span = document.createElement("span"),
    sronly = span.cloneNode(),
    menuname = document.createTextNode(vendormenu.menuname);

  navitem.classList.add("nav-item");
  navlink.classList.add("nav-link")
  navlink.href = clientBaseUrl+vendormenu.menulink;
  sronly.classList.add("sr-only");
  span.setAttribute("data-feather", "home");
  navlink.appendChild(span);
  navlink.appendChild(menuname)
  navitem.appendChild(navlink);
  sronly.textContent = "(current)"  
  if(clientBaseUrl.toLocaleLowerCase() + vendormenu.menulink.toLowerCase() === window.location.href.toLocaleLowerCase()) {
    navlink.classList.add("active");
    navlink.appendChild(sronly)
  }

  return navitem

},
makesidebar = (vendormenu) => {
  // debugger;
  const sidebarmenu = document.createElement("div"),
    sidebarsticky = sidebarmenu.cloneNode(),
    ul = document.createElement("ul");
  sidebarmenu.classList.add("col-md-3","col-lg-2","d-md-block","bg-light","sidebar","collapse");
  vendormenu.forEach(val => ul.appendChild(makenavitem(val)));
  sidebarsticky.appendChild(ul);
  sidebarsticky.classList.add("sidebar-sticky","pt-3");
  ul.classList.add("nav", "flex-column");
  sidebarmenu.appendChild(sidebarsticky);
  document.querySelector("main").parentElement.insertBefore(sidebarmenu, document.querySelector("main"));
};

getUserInfo().then(data => {
  // debugger;
  if(data) {
      profilename.textContent = data.user.name;
      profilerole.textContent = data.user.role;
      profileimg.src = data.user.gender === "male" ? "../assets/img/undraw_male_avatar_323b.svg" : "../assets/img/undraw_female_avatar_w3jk.svg"
      logout.addEventListener("click", signout);
  } else throw "error"
}).catch(ex => {
  debugger;
  signout();
  console.log(ex);
});

/*
  
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="sidebar-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link active" href="#">
                <span data-feather="home"></span>
                Dashboard <span class="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
*/

  