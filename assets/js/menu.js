const menulist = [{
    menuname: "Home",
    menulink: "index.html"
},{
    menuname: "Vendors",
    menulink: "vendorpage.html"
},{
    menuname: "User Signup",
    menulink: "reg.html",
    menuclass: "user-signup"
},{
    menuname: "Vendor Registration",
    menulink: "vendorreg.html",
    menuclass: "vendor-reg"
},{
    menuname: "Login",
    menulink: "login.html",
    menuclass: "login"
}],
  brandname= "Plan Your Event",
  nav = document.createElement("nav"),
  containerdiv = document.createElement("div"),
  collaspediv = document.createElement("div"),
  ul = document.createElement("ul"),
  collapsediv = document.createElement("div"),
  navbarbrand = document.createElement("a"),
  makemenu = async ({menuname, menulink, menuclass = ""})=>{

      const navlink = document.createElement("a");
      const navitem = document.createElement("li");
      
      navlink.href = await menulink;
      navlink.classList.add("nav-link", "m-auto");
      navitem.classList.add("nav-item", "d-flex");
      if(await menuclass) {
        navitem.classList.add(menuclass);
      }
      navlink.textContent = menuname;
      navitem.appendChild(navlink);

      return navitem;

  },
  navbartoggler = async ()=>{
    
    const button = await document.createElement("button");
    const span = await document.createElement("span");

    span.classList.add("navbar-toggler-icon");
    button.type = "button";
    button.setAttribute("data-toggle", "collapse");
    button.setAttribute("data-target", "#navbarSupportedContent");
    button.setAttribute("aria-controls", "navbarSupportedContent");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Toggle nagvigation");
    button.classList.add("navbar-toggler")
    button.appendChild(span);
    return button;
};

navbarbrand.classList.add("navbar-brand");
ul.classList.add("navbar-nav","ml-auto");
navbarbrand.textContent = brandname;
collaspediv.classList.add("collapse", "navbar-collapse");
collaspediv.id = "navbarSupportedContent",

containerdiv.classList.add("container-fluid", "px-md-5",);
nav.classList.add("navbar", "navbar-expand-lg", "navbar-dark", "bg-dark",);
nav.style.height = "76px";

menulist.forEach((menu,index, array) => {
  makemenu(menu).then(menuli =>{
    if(index+1 === array.length) {
      menuli.firstElementChild.classList.add("login", "btn-outline-light", "btn");
    }
    ul.appendChild(menuli);
  });
    
});

navbartoggler().then(togglebar=>{
  collaspediv.appendChild(ul);
  containerdiv.appendChild(collaspediv);
  containerdiv.insertBefore(togglebar, containerdiv.firstElementChild);
  containerdiv.insertBefore(navbarbrand, containerdiv.firstElementChild);
  nav.appendChild(containerdiv);
  document.body.insertBefore(nav, document.body.firstElementChild);
})

/* <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="height: 76px;">
    <div class="container-fluid px-md-5">
    <a class="navbar-brand" href="index.html">Plan Your Event</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="index.html">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="vendorpage.html">Vendors</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="customerregistration.html">User Signup</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="vendorreg.html"> Vendor Registration</a>
        </li>
        <li class="nav-item">
          <a class="nav-link login btn-outline-light btn" href="login.html">Login</a>
        </li>
      </ul>
    </div>
    </div>
  </nav> */
