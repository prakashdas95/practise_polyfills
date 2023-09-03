// 1. Polyfill for bind

// let name = {
//   fname: "prakash",
//   lname: "das",
// };

// let printname = function (state, country) {
//   console.log(this.fname + " " + this.lname + " " + state + " " + country);
// };

// Function.prototype.mybind = function (...args) {
//   let obj = this;
//   let params = args.slice(1);
//   console.log("params: ", params);

//   return function (...args2) {
//     console.log("args2: ", args2);
//     obj.apply(args[0], [...params, ...args2]);
//   };
// };

// let p = printname.mybind(name, "delhi");
// p("india");

// OR

// Function.prototype.myBind = function (context = {}, ...args) {
//   if (typeof this !== "function") {
//     throw new Error("Not callable!");
//   }

//   context.fn = this;

//   return function (...args2) {
//     return context.fn(...args, ...args2);
//   };
// };

// let p = printname.myBind(name, "delhi");
// p("India");

// 2. Polyfill for call

// let name = {
//   fname: "prakash",
//   lname: "das",
// };

// let printname = function (state, country) {
//   console.log(this.fname + " " + this.lname + " " + state + " " + country);
// };

// Function.prototype.myCall = function (context, ...args) {
//   if (typeof this !== "function") {
//     throw new Error("Not callable!");
//   }
//   context.fn = this;
//   context.fn(...args);
// };

// printname.myCall(name, "delhi", "india");

// 3. Polyfill for apply

// let name = {
//   fname: "prakash",
//   lname: "das",
// };

// let printname = function (state, country) {
//   console.log(this.fname + " " + this.lname + " " + state + " " + country);
// };

// Function.prototype.myApply = function (context = {}, args = []) {
//   if (typeof this !== "function") {
//     throw new Error("not a function");
//   }

//   if (!Array.isArray(args)) {
//     throw new Array("not an array");
//   }

//   context.fn = this;
//   context.fn(...args);
// };

// let p = printname.myApply(name, ["Delhi", "India"]);

// 4. Polyfill for map

// Array.prototype.myMap = function (cb) {
//   let temp = [];

//   for (let i = 0; i < this.length; i++) {
//     temp.push(cb(this[i], i, this));
//   }

//   return temp;
// };

// arr = [1, 2, 3, 4, 5];

// const newArr = arr.myMap((num, i, array) => num * 2);
// console.log("newArr: ", newArr);

// 5. Polyfill for forEach

// Array.prototype.myForEach = function (cb) {
//   for (let i = 0; i < this.length; i++) {
//     cb(this[i], i, this);
//   }
// };

// arr1 = [1, 2, 3, 4, 5];

// arr1.myForEach((num, i, array) => console.log(num * 2));

// 6. Polyfill for filter

// Array.prototype.myFilter = function (cb) {
//   let temp = [];

//   for (let i = 0; i < this.length; i++) {
//     if (cb(this[i], i, this)) {
//       temp.push(this[i]);
//     }
//   }
//   return temp;
// };

// const myArr = [1, 2, 3, 4, 5];

// const newArray = myArr.myFilter((value, index, array) => value > 2);
// console.log("newArray: ", newArray);

// 7. Polyfill for reduce

// Array.prototype.myReduce = function (cb, initialValue) {
//   let accumulator = initialValue;

//   for (let i = 0; i < this.length; i++) {
//     accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
//   }

//   return accumulator;
// };

// const myArr = [1, 2, 3, 4, 5];

// const newArray = myArr.myReduce((acc, curr, index, array) => {
//   console.log(acc, curr);
//   return acc + curr;
// }, 0);
// console.log("newArray: ", newArray);

//8. Polyfill for setTimeout

function createSetTimeoutPolyfill() {
  var timerId = 0;
  var timerMap = {};

  function createSetTimeout(cb, delay = 0) {
    var id = timerId++;
    timerMap[id] = true;
    var start = Date.now(); // milliseconds
    function triggerCallBack() {
      if (!timerMap[id]) return;
      if (Date.now > start + delay) {
        cb();
      } else {
        requestIdleCallback(triggerCallBack); //checking until of condition satisfied
      }
    }
    requestIdleCallback(triggerCallBack);
    return id;
  }

  function clearTimeOut(id) {
    delete timerMap[id];
  }
  return { createSetTimeout, clearTimeOut };
}

var { createSetTimeout, clearTimeOut } = createSetTimeoutPolyfill();
console.log("start");
createSetTimeout(() => {
  console.log("Prakash Das");
}, 5000);
console.log("end");
