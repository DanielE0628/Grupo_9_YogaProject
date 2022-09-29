const db = require ('./database/models');

db.Products
    .findAll( {
        include: [{ association: 'categorys' }]
    })
    .then ( users => {
        
            console.log (users)
        }
    // .then ( users => {
    //   for (let user of users) {
    //      console.log (user.id, user.category_id, user.categorys.n)
    //   }
    )