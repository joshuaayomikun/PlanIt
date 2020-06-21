/* globals Chart:false, feather:false */

const makenavitem = (menu) => {
  const navitem = document.createElement("li"),
    navlink = document.createElement("a"),
    span = document.createElement("span"),
    sronly = span.cloneNode(),
    menuname = document.createTextNode(menu.menuname);
  navlink.href = menu.menulink;
  sronly.classList.add("sr-only");
  span.setAttribute("data-feather", "home");
  navlink.appendChild(span);
  navlink.appendChild(menuname)
  navitem.appendChild(navlink);
  sronly.textContent = "(current)"
  navlink.classList.remove("active");
  if(clientBaseUrl.toLocaleLowerCase() + menu.menulink.toLoweCase() === window.location.href.toLocaleLowerCase()) {
    navlink.classList.add("active");
    navlink.appendChild(sronly)
  }
  return navitem


},
makesidebar = (menu) => {
  const sidebarmenu = document.createElement("div"),
    sidebarsticky = sidebarmenu.cloneNode(),
    ul = document.createElement("ul");
  menulist.forEach(val => ul.app)
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

  