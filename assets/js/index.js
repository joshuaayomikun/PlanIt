$('.owl-carousel').owlCarousel({
    loop: true,
    autoplay: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 5,
        nav: true,
        loop: false
      }
    }
  });
  getAllServices("getSixAllDiscountServices").then(data => {
      console.log(data);
    const productlist = document.querySelector(".product-list");
    let services = data.services;
    const sixdiscount = shuffle(services).filter(val => val.discount !== "" )
                            .filter((val, index) => index < 6);
    shuffle(sixdiscount).forEach(product => productlist.appendChild(makeproductcard(product)));
    const productcards = document.querySelectorAll(".product");
    productcards.forEach(productcard => {
      const serviceid = getUrlVars(productcard.querySelector('.card-link').href)['serviceid'];
      getServicePictureById(serviceid).then(picture =>makeProductImageCard(productcard, picture.service.imageUrl));
    });

  })
    
    //     <div class="card product">
    //     <img class="card-img-top" src="assets/img/1.jpg" alt="Card image cap">
    //     <div class="card-body">
    //       <a href="land.html" class="card-link">Landmark event centre</a>
    //       <p class="card-text">₦ 1,700,000 / day</p>
    //       <p class="card-text">LIMITED DEAL: 20% off </p>     
    //     </div>
    //   </div>