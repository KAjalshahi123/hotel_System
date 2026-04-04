// // function add(a, b){

// //       return a+b;

// // }

// // var ans =  (a,b) => a+b;
// // // var result = add(9, 10);
// // console.log(ans(9, 10));

// // // callback function
// // function  add(a, b, callback){
// //     var sum  = a+b;
// //     console.log("Sum is", + sum);
// //     callback();
// // }
// // // 
// // // function display(){
// // //     console.log("I am dispaly function");  // callback function}
// // add(2, 4, ()=> console.log("I am display function"));



// var fs = require('fs');
// var os =  require('os');

// var user = os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile('greet.txt', `Hello ${user.username} \n`, (err) => {
//     if(err) throw err;
//     console.log("File is created");
// });


// function call another function and file
const result = require('./OS_FS'); 
console.log(result); 

const age = result.age;
console.log(age); 

const sum = result.addNum(age+5, 10);
console.log(sum);