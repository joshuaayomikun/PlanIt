
const userstring = window.localStorage.getItem("user"),
user = typeof userstring !== 'undefined' ? JSON.parse(userstring): "",
menulist = [{
    menuname: "Dashboard",
    menulink: "admin/index.html"
},{
    menuname: "Customers",
    menulink: "admin/user.html"
},{
    menuname: "admin/Reports",
    menulink: "",
},{
    menuname: "Vendors",
    menulink: "admin/listofvendors.html",
}];
debugger
if(user) {
    user.role.toLowerCase() !== "admin"? (function(){
        alert("You don't have access to this page!!");
        signout()}()):""
}
// debugger
makesidebar(menulist);