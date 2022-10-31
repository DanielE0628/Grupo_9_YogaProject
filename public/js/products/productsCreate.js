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

  
    //------------------------------------
    //--------------header fin------------
    //------------------------------------

const talle = document.querySelector("#talle");
const category =  document.querySelector("#categoty_id");
category.addEventListener("mouseover", (e)=>{
    if (category.value !== 1){
        talle.style.display = "none"
    }

})







    
}