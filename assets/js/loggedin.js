const login = document.querySelector('.login'),
    vendorreg = document.querySelector('.vendor-reg'),
    usersignup = document.querySelector('.user-signup'),
    usernav = document.createElement("li"),
    profilename = document.createElement("a"),
    profileimg = document.createElement("img"),
    mydashboard = profilename.cloneNode(true),
    logout = profilename.cloneNode(true),
    dropdownmenu = document.createElement("div"),
    name = document.createTextNode(""),
    
getAllServices = async() => {
    try{
        const response = await fetch(`${apiBaseUrl}api/vendors/getAllService`);
        if(response.ok)
        if(response.ok)
        return response.json();

        throw "Error in fetching"
    } catch(ex) {
        toastnotification("error!", "Error in fteching")
    }
},
makeproductcard = ({discount, price, title, imageUrl}) => {
    const productcard = document.createElement("div"),
      productimage = document.createElement("img"),
      cardbody = productcard.cloneNode(),
      cardlink = document.createElement("a"),
      productprice = document.createElement("p"),
      productdiscount = productcard.cloneNode();
      
      productprice.textContent = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'NGN' }).format(price)
      productdiscount.textContent = `LIMITED DEAL: ${discount} off `
      cardlink.textContent = title;
      productimage.src = imageUrl;

      productcard.classList.add("card","product")
      productimage.classList.add("card-img-top")
      cardbody.classList.add("card-body")
      cardlink.classList.add("card-link")
      productprice.classList.add("card-text")
      productdiscount.classList.add("card-text")

      cardbody.appendChild(cardlink);
      cardbody.appendChild(productprice);
      cardbody.appendChild(productdiscount);
      productcard.appendChild(productimage);
      productcard.appendChild(cardbody);


      return productcard;
};
dropdownmenu.classList.add("dropdown-menu")
logout.classList.add("dropdown-item");
logout.textContent = "logout";
mydashboard.textContent = "my dashboard"
mydashboard.classList.add("dropdown-item");
profilename.classList.add("nav-link", "dropdown-toggle");
profilename.id= "dropdownMenuLink";
profilename.setAttribute("data-toggle", "dropdown");
profileimg.setAttribute("style", "width: 40px; height: auto;");
profileimg.classList.add("img-rounded", "user-image", "p-2");
usernav.classList.add("nav-item", "text-nowrap", "dropdown");
profilename.appendChild(profileimg);
profilename.appendChild(name);
dropdownmenu.appendChild(mydashboard);
dropdownmenu.appendChild(logout);
usernav.appendChild(profilename);
usernav.appendChild(dropdownmenu);

getUserInfo().then(data => {
    if(data) {
        // if(data.message === "Authentication failed! Invalid token")
        // {
        //     signout();
        //     window.location.href = "logi"
        // }
        debugger;
        login.parentNode.appendChild(usernav);
        login.parentNode.removeChild(login);
        vendorreg.parentNode.removeChild(vendorreg);
        usersignup.parentNode.removeChild(usersignup);
        name.textContent = data.user.name;
        profileimg.src = data.user.gender === "male" ? "assets/img/undraw_male_avatar_323b.svg" : "assets/img/undraw_female_avatar_w3jk.svg"
        logout.addEventListener("click", signout);
        mydashboard.addEventListener("click", gotomydashboard)
    }
}).catch(ex => {
    debugger;
    console.log(ex);
});

// <li class="nav-item text-nowrap dropdown">
//           <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
//             aria-expanded="false">
//             <img src="../assets/img/undraw_male_avatar_323b.svg" style="width: 40px; height: auto;" alt="user icon" class="img-rounded user-image">
//           </a>
//           <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
//             <a class="dropdown-item" href="#">Action</a>
//             <a class="dropdown-item" href="#">Another action</a>
//             <a class="dropdown-item" href="#">Something else here</a>
//           </div>
//         </li>