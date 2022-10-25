window.onload = function(){
//add carrito
    let prodcuto = document.querySelector(' #product')
    let botonComprar = document.querySelector(' #comprar')
    console.log("Script running")
    prodcuto.addEventListener('submit',(e)=>{
        e.preventDefault;
        console.log('Estoy comprando')
    })

    const filterButton = document.querySelector("#filterButton");
    console.log("hola estoy dentro del carrito");
    
    filterButton.addEventListener('click', (e) => {
     
    console.log("funciono")
    })




//filter button



}