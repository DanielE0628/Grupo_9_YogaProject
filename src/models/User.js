const { timeStamp } = require('console');
const fs = require('fs');
const path = require('path');

const User = {
    fileName: path.join(__dirname, '..', 'data', 'usersDataBase.json'),
    
    getData: 
        function (){
            return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
        }
    ,
    findAll: 
        function (){
            return this.getData()
        }
    ,
    findByPk: 
        function(id){
            let allUsers = this.findAll();
            let userFound = allUsers.find(oneUser => oneUser.id == id);
            return userFound
        }
    ,
    findByField: 
        function(field, text){
            let allUsers = this.findAll();
            let userFound = allUsers.find(oneUser => oneUser[field] == text);
            return userFound
        }
    ,
    //new id
    generateId:
        function(){
            let allUsers = this.findAll();
            let lastUser = allUsers.pop()
            if (lastUser){
                return lastUser.id + 1;
            }
            return 1;
        }
    ,
    create: 
        function (userData, image) {
            let allUsers = this.findAll();
            
            //crear nuevo usuario
            let newUser = {
                id: this.generateId(),
                imagenUsuario: image,
                ...userData
            }
            //agregar nuevo usuario a DATA JSON
            allUsers.push(newUser);
            fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '))
            return newUser;
        }
    ,

    addAvatar: 
        function (userFile) {
            let image = '';
            if(userFile){
                image = userFile.filename;
            }else{
                image = "default-user.png";
            }
            return image;
        }
    ,
    edit:
        function (userData) {
            let allUsers = User.findAll();
            console.log('findAll()')
            console.log(allUser)
            let userToEdit = allUsers.forEach((item) => {
                if(item.id == userData.id){
                    item.nombre_y_apellido= 'editado';
                    item.fecha_de_nacimiento = userData.fecha_de_nacimiento;
                }
                console.log('userToEdit');
                console.log(userToEdit);

        });
            fs.writeFileSync(this.fileName, JSON.stringify(userToEdit, null, ' '));
            return res.redirect('/');
        }
    ,

    delete:
        function (id){
            let allUsers = this.findAll();
            let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
            fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '))
            return true;
        }
}

module.exports = User;

// console.log(User.findAll());
// console.log(User.findByPk(3));
// console.log(User.findByField('email','Prueba4@Prueba4'));
//console.log(User.create({nombre_y_apellido: "PruebaX",email: "PruebaXY@PruebaX"}));
//console.log(User.delete(21));

