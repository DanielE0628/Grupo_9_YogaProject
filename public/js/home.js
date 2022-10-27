window.onload = function(){
    //------------------------------------
    //--------------header----------------
    //------------------------------------
    const menuHeaderButton = document.querySelector("#menuHeaderButton")

    menuHeaderButton.addEventListener('click', (e) => {
        console.log("a la grande le puse kuka")
        const menuHeader = document.querySelector("menuHeader")
  
       
        if (menuHeader.style.display === "none") {
            menuHeader.style.display = "flex";
            menuHeader.style.position = "fixed";
            menuHeader.style.flexDirection= "column";
            menuHeader.style.top = "12%";
        }else{
            (menuHeader.style.display === "none")
        }
    
    });
   
  
    //------------------------------------
    //--------------header fin------------
    //------------------------------------

    
}