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
    makeShoppingCart = async () => {

            const licart = document.createElement("li"),
                cartspan = document.createElement("span"),
                badgespan = cartspan.cloneNode();
            badgespan.classList.add("badge", "badge-danger", "cart-count", "m-auto");
            const data = await getCartCount();
            badgespan.textContent = 0;
            if (typeof data.count !== "undefined")
                badgespan.textContent = data.count;
            licart.classList.add("nav-item", "text-white", "d-flex");
            cartspan.setAttribute("data-feather", "shopping-cart");
            cartspan.classList.add("m-auto");
            licart.appendChild(cartspan)
            licart.appendChild(badgespan)
            setTimeout(() => feather.replace(), 1);

            return licart;

        },
        getCartCount = async () => {
                try {
                    if (typeof user !== "undefined" || user !== null) {
                        if (user !== "") {
                            makeSpinner()
                            const response = await fetch(`${apiBaseUrl}api/getCartCountByUserId/${user.userId}`)
                            if (response.status === 200 || response.status === 201) {
                                removeSpinner();
                                return response.json();
                            }
                            throw Error;
                        }
                    }
                } catch (ex) {
                    removeSpinner()
                    toastnotification("error", ex.message);
                }
            },
            getAllServices = async (url = "getAllService") => {
                    try {

                        makeSpinner()
                        const response = await fetch(`${apiBaseUrl}api/vendors/${url}`);
                        if (response.ok)
                            if (response.status === 201 || response.status === 200) {

                                removeSpinner()
                                return response.json();
                            }
                        throw "Error in fetching"
                    } catch (ex) {
                        toastnotification("error", ex.message)

                        removeSpinner()
                    }
                },
                makeproductcard = ({
                    discount,
                    price,
                    title,
                    imageUrl,
                    _id
                }) => {
                    const productcard = document.createElement("div"),
                        productimage = document.createElement("img"),
                        cardbody = productcard.cloneNode(),
                        cardlink = document.createElement("a"),
                        productprice = document.createElement("p"),
                        productdiscount = productprice.cloneNode();

                    productprice.textContent = new Intl.NumberFormat(undefined, {
                        style: 'currency',
                        currency: 'NGN'
                    }).format(price)
                    productdiscount.textContent = `LIMITED DEAL: ${discount} off `
                    cardlink.textContent = title;
                    productimage.src = imageUrl;
                    cardlink.href = `viewservice.html?serviceid=${_id}`

                    productcard.classList.add("card", "product")
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
                },
                makeserviceproductcard = ({
                    address,
                    state,
                    title,
                    imageUrl,
                    _id
                }) => {
                    const productcard = document.createElement("div"),
                        productimage = document.createElement("img"),
                        cardbody = productcard.cloneNode(),
                        cardlink = document.createElement("a"),
                        productlocation = document.createElement("p"),
                        viewprofile = cardlink.cloneNode();

                    productlocation.textContent = `${address} ${state}`
                    viewprofile.textContent = "View profile"
                    cardlink.textContent = title;
                    productimage.src = imageUrl;
                    cardlink.href = `viewservice.html?serviceid=${_id}`

                    productcard.classList.add("card", "product")
                    productimage.classList.add("card-img-top")
                    cardbody.classList.add("card-body")
                    cardlink.classList.add("card-link")
                    productlocation.classList.add("card-text")
                    viewprofile.classList.add("btn", "btn-primary")

                    cardbody.appendChild(cardlink);
                    cardbody.appendChild(productlocation);
                    cardbody.appendChild(viewprofile);
                    productcard.appendChild(productimage);
                    productcard.appendChild(cardbody);


                    return productcard;
                },
                consumeservices = (serviceType) => {
                    getAllServices(`getSixServicesByServiceType/${serviceType}`).then(data => {
                        console.log(data);
                        const productlist = document.querySelector(".product-list");
                        let services = data.services;
                        const sixdiscount = shuffle(services).filter(val => {
                                if (val.serviceType) {
                                    return val.serviceType.toLowerCase().trim() === serviceType;
                                } else {
                                    return false;
                                }
                            })
                            .filter((val, index) => index < 6);
                        shuffle(sixdiscount).forEach(product => productlist.appendChild(makeserviceproductcard(product)));

                    })
                },
                populateCart = async (e, ServiceCredendtials = {}) => {
                    e.preventDefault();
                    makeSpinner()
                    try {
                        if (typeof user === "undefined") {
                            alert("You need to sign in")
                            window.location.href = `login.html?redirecturl=${redirecturl}`
                            removeSpinner()
                            return;
                        }
                        const response = await fetch(`${apiBaseUrl}api/addToCart`, {
                            method: 'POST', // *GET, POST, PUT, DELETE, etc.
                            headers: {
                                'Content-Type': 'application/json',
                                'x-access-token': user.userId
                            },
                            body: JSON.stringify(ServiceCredendtials) // body data type must match "Content-Type" header
                        });
                        debugger
                        if (response.status === 200 || response.status === 201) {
                            removeSpinner();
                            return response.json();
                        }
                        if (response.status === 422)
                            throw new Error("You can't add more than one of this item");
                        else
                            throw new Error(`HTTP rerror! status: ${esponse.status}`);
                    } catch (ex) {
                        toastnotification("error", ex)
                        removeSpinner()
                    }
                };
dropdownmenu.classList.add("dropdown-menu")
logout.classList.add("dropdown-item");
logout.textContent = "logout";
mydashboard.textContent = "my dashboard"
mydashboard.classList.add("dropdown-item");
profilename.classList.add("nav-link", "dropdown-toggle");
profilename.id = "dropdownMenuLink";
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

if (user !== null) {
    if (typeof user.userId !== "undefined") {
        getUserInfo(user.userId).then(async data => {
            if (data) {
                // if(data.message === "Authentication failed! Invalid token")
                // {
                //     signout();
                //     window.location.href = "logi"
                // }
                // debugger;
                login.parentElement.appendChild(usernav);
                usernav.parentElement.appendChild(await makeShoppingCart());
                login.parentNode.removeChild(login);
                vendorreg.parentNode.removeChild(vendorreg);
                usersignup.parentNode.removeChild(usersignup);
                name.textContent = data.user.name;
                profileimg.src = data.user.gender === "male" ? "assets/img/undraw_male_avatar_323b.svg" : "assets/img/undraw_female_avatar_w3jk.svg"
                logout.addEventListener("click", signout);
                mydashboard.addEventListener("click", gotomydashboard)
            }
        }).catch(ex => {
            toastnotification("Error", ex.message)
            console.log(ex);
        });
    }
}



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