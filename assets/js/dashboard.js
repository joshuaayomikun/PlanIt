/* globals Chart:false, feather:false */

const makenavitem = (vendormenu) => {
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
}

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

  