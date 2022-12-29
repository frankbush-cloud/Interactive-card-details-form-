let num ="a100.dfwe";
let format = num.replace(/[\D]/g, "");
console.log(format);

let numx = '123456789';
let numx1 = numx.match(/\d{1,4}/g);
let numx2 = numx1.join(" ");

console.log(numx2, numx)

1234567812345678

