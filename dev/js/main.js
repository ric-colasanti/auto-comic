// opens the menu
function navFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }


// call to get the page   
async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}

// get the html for the template puts in to the element with the id elmt
async  function getTemplate(elmt,page,fun){
      let itm = document.getElementById(elmt);
      let address = "template/"+page+".html"
      itm.innerHTML = await fetchHtmlAsText(address)
      //frameInit()
      fun()
  }

var noFunction = function(){
  console.log("no function");  
}
// Auto lod the home page  
console.log("main loded")

