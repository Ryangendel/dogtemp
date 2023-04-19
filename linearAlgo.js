var database = [
    {name:"Runa", age:4, breed:"bulldog", id:1234},
    {name:"Hunter", age:6, breed:"yorkshire", id:12345},
    {name:"Skadi", age:2, breed:"bulldog", id:123456},
    {name:"Odie", age:4, breed:"pit", id:1234567}
  ]

var linearSearch=function(array, id){
    var newID = Math.floor(100000 + Math.random() * 900000)
    for (var i = 0;i<array.length;i++){
        if(array[i].id===id){
            
        }
    }
    return "dog not found"
}

console.log(linearSearch(database, 1234))