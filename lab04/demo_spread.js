user = {name: "Alex" , age: 18, gender: "Male" ,password:"xxx"};

person = {...user, age:20}; //...user is getting all data of user back 
person = {...user , country : "US"};
console.log(person);

// function account({name, password}){
//     return {name, password};
// }

// //acc = account(user);
// acc = account({...user});
// console.log(acc);
