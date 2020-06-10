const footer = document.createElement("footer");
footer.classList.add("page-footer", "font-small", "bg-dark", "text-white")

const divcontainer = document.createElement("div");
divcontainer.classList.add("container", "text-center", "text-md-left");

const companyLink = [{
  footername:"About",
  footerlink:"#!"
},{
  footername:"How It Works",
  footerlink:"#!"
}
,{
  footername:"Terms and Condition",
  footerlink:"#!"
},{
  footername:"Privacy Policy",
  footerlink:"#!"
}];

const discoverLink = [{
  footername:"Drink Vendors",
  footerlink: "drinkvendor.html"
},{
  footername:"Caterers",
  footerlink:"caterer.html" 
},{
  footername:"Makeup Artists",
  footerlink:"makeup.html" 
},{
  footername:"Djs",
  footerlink:"dj.html" 
},{
  footername:"Photographers",
  footerlink:"photo.html" 
}]

const connectLink = [{
  footername:"Contact Us",
  footerlink: "#!"
},{
  footername:"Facebook",
  footerlink:"#!" 
},{
  footername:"Instagram",
  footerlink:"#!" 
},{
  footername:"LinkedIn",
  footerlink:"#!" 
},{
  footername:"Twitter",
  footerlink:"#!" 
}]

const makefooterlink = async ({footername, footerlink})=> {
  const li = await document.createElement("li");
  const footerLink = await document.createElement("a");
  footerLink.classList.add("footer-link");
  footerLink.textContent = footername;
  footerLink.href = footerlink;

  li.appendChild(footerLink);

  return li;
};


const divrow = document.createElement("div");
divrow.classList.add("row");

const makefootersection = async (footersecname, footerarray) => {

  const column = await document.createElement("div");
  column.classList.add("col-md-4","mx-auto")
  const ul = await document.createElement("ul");
  const heading = await document.createElement("h5");
  ul.classList.add("list-unstyled");
  // heading.appendChild("h5");
  heading.textContent = footersecname;
  heading.classList.add("font-weight-bold", "text-uppercase", "mt-3", "mb-4", "company-link")
  column.appendChild(heading);
  
  await footerarray.forEach(async (link, index) => {
    const footer = await makefooterlink(link);
    await ul.appendChild(footer)
  });

  await column.appendChild(ul);
  return column;
};

makefootersection("COMPANY", companyLink).then(footersection => {
  divrow.appendChild(footersection);
  const hr = document.createElement("hr");
  hr.classList.add("clearfix", "w-100", "d-md-none");
});

makefootersection("DISCOVER", discoverLink).then(footersection => {
  divrow.appendChild(footersection);
  const hr = document.createElement("hr");
  hr.classList.add("clearfix", "w-100", "d-md-none");
});

makefootersection("CONNECT", connectLink).then(footersection => {
  divrow.appendChild(footersection);
  const hr = document.createElement("hr");
  hr.classList.add("clearfix", "w-100", "d-md-none");
});



const companycolumn = document.createElement("div");
companycolumn.classList.add("col-md-4","mx-auto")

const discovercolumn = document.createElement("div");
discovercolumn.classList.add("col-md-4","mx-auto")

const connectcolumn = document.createElement("div");
connectcolumn.classList.add("col-md-4","mx-auto");

divcontainer.appendChild(divrow);

const footerCopyright = document.createElement("div");
const textnode = document.createTextNode("©️ 2020 Copyright:");
const a = document.createElement("a");
a.href="https://github.com/dami-design";
a.textContent = "Dami.com";
a.setAttribute("target", "_blank");
footerCopyright.classList.add("footer-copyright", "text-center", "py-3")
footerCopyright.appendChild(textnode);
footerCopyright.appendChild(a);
footer.appendChild(divcontainer);
footer.appendChild(footerCopyright);
document.body.appendChild(footer);

  //   <footer class="page-footer font-small bg-dark text-white">

  //   <!-- Footer Links -->
  //   <div class="container text-center text-md-left">

  //     <!-- Grid row -->
  //     <div class="row">

  //       <!-- Grid column -->
  //       <div class="col-md-4 mx-auto">

  //         <!-- Links -->
  //         <h5 class="font-weight-bold text-uppercase mt-3 mb-4 company-link">COMPANY</h5>

  //         <ul class="list-unstyled">
  //           <li>
  //             <a href="#!" class="footer-link">About</a>
  //           </li>
  //           <li>
  //             <a href="#!" class="footer-link">How It Works</a>
  //           </li>
  //           <li>
  //             <a href="#!" class="footer-link">Terms and Condition</a>
  //           </li>
  //           <li>
  //             <a href="#!" class="footer-link">Privacy Policy</a>
  //           </li>
  //         </ul>

  //       </div>
  //       <!-- Grid column -->

  //       <hr class="clearfix w-100 d-md-none">

  //       <!-- Grid column -->
  //       <div class="col-md-4 mx-auto">

  //         <!-- Links -->
  //         <h5 class="font-weight-bold text-uppercase mt-3 mb-4 discover-link">DISCOVER</h5>

  //         <ul class="list-unstyled">
  //           <li>
  //             <a href="#!" class="footer-link">Cake Vendors</a>
  //           </li>
  //           <li>
  //             <a href="#!" class="footer-link">Caterers</a>
  //           </li>
  //           <li>
  //             <a href="#!" class="footer-link">Event Planners</a>
  //           </li>
  //           <li>
  //             <a href="#!" class="footer-link">Photographers</a>
  //           </li>
  //           <li>
  //             <a href="#!" class="footer-link">Makeup Artists</a>
  //           </li>
  //         </ul>

  //       </div>

  //       <hr class="clearfix w-100 d-md-none">

  //       <!-- Grid column -->
  //       <div class="col-md-4 mx-auto">

  //         <!-- Links -->
  //         <h5 class="font-weight-bold text-uppercase mt-3 mb-4 social-link">CONNECT</h5>

  //         <ul class="list-unstyled">
  //           <li>
  //             <a href="#!" class="footer-link">Contact Us</a>
  //           </li>
  //           <li>
  //             <a href="#!" class="footer-link">Facebook</a>
  //           </li>
  //           <li>
  //             <a href="#!" class="footer-link">Instagram</a>
  //           </li>
  //           <li>
  //             <a href="#!" class="footer-link">Facebook</a>
  //           </li>
  //         </ul>

  //       </div>
  //       <!-- Grid column -->

  //     </div>
  //     <!-- Grid row -->

  //   </div>
  //   <!-- Footer Links -->

  //   <!-- Copyright -->
  //   <div class="footer-copyright text-center py-3">©️ 2020 Copyright:
  //     <a href="https://github.com/dami-design" target="_blank"> Dami.com</a>
  //   </div>
  //   <!-- Copyright -->

  // </footer>