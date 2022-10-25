window.onload = function(){
//add carrito
    let prodcuto = document.querySelector(' #product')
    let botonComprar = document.querySelector(' #comprar')
    console.log("Script running")
    prodcuto.addEventListener('submit',(e)=>{
        e.preventDefault;
        console.log('Estoy comprando')
    })




//filter button


const filterButton = document.querySelector("#filterButton");
console.log("hola estoy dentro del front ");

filterButton.addEventListener('click', (e) => {
 
console.log("funciono")
})


}