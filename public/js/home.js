window.onload = function(){
    //------------------------------------
    //--------------header----------------
    //------------------------------------
   
    //meun desplegable
    const menuHeaderButton = document.querySelector("#menuHeaderButton")
   
    menuHeaderButton.addEventListener('click', (e) => {
        const menuHeader = document.querySelector("#menuHeader")
        console.log("a la grande le puse kuka")
        if (menuHeader.style.display == "none") {
            menuHeader.style.display = "flex";
            menuHeader.classList.add("menuDesplegable") 
        }else{
           menuHeader.style.display = "none"
        }
    });
   
    //Search bar
    const searchButton = document.querySelector("#searchButton ");   
    searchButton.addEventListener('click', (e) => { 
        if(searchButton.display != "none"){
        e.preventDefault()
const searchBar = document.querySelector("header .SearchBar input")
console.log("que no toque nada??? VOY A TOCARLO TODO!!!!")

    searchBar.style.display = "block";
    searchBar.classList.add("movilSearchBar") 
        }else{
            searchButton.addEventListener('click', (e) => { })
        }
    })
  
    //------------------------------------
    //--------------header fin------------
    //------------------------------------

    
}