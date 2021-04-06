const eqn_size = document.querySelector(".eqn_size");
const inp_field = document.getElementsByClassName("inp_field");
const jacobi = document.getElementById("jacobi");
const sidel = document.getElementById("sidel");
const find = document.getElementById("find-btn");
const input = document.getElementById("input-ar");

var A = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
var B = [0, 0, 0];
const precision = 0.0001;


//event listeners
jacobi.addEventListener('click', function() {
    jacobi_method();
});
sidel.addEventListener('click', function() {
    gauss_sidel_method();
});
//find.addEventListener('click', setMatrix);

//function 
function setMatrix(event) {
    // event.preventDefault();
    const temp = input.value;
    const arr = temp.split("\n");
    for (var i = 0; i < 3; i++) {
        var arr1=arr[i].split(",");
        for(var j=0; j<4; j++){
            if (!(j === 3)) {
                A[i][j] = arr1[j];
            } else {
                B[i] = arr1[j];
            }
    
        }
        
    }
    console.log(A);
}

function x_equation(y, z) {
    x = (B[0] - A[0][1] * y - A[0][2] * z) / A[0][0];
    return x;
}

function y_equation(x, z) {
    y = (B[1] - A[1][0] * x - A[1][2] * z) / A[1][1];
    return y;
}

function z_equation(x, y) {
    z = (B[2] - A[2][0] * x - A[2][1] * y) / A[2][2];
    return z;
}

function jacobi_method() {
    setMatrix();
    var x0 = 0,
        y0 = 0,
        z0 = 0;
    var x1 = 0,
        y1 = 0,
        z1 = 0;
    count = 0;
    do {
        x1 = x_equation(y0, z0);
        y1 = y_equation(x0, z0);
        z1 = z_equation(x0, y0);

        e1 = x1 - x0;
        e2 = y1 - y0;
        e3 = z1 - z0;

        x0 = x1;
        y0 = y1;
        z0 = z1;

        count++;
    } while (e1 > precision && e2 > precision && e3 > precision);
    window.alert("iteration: " + count + "\n" + "x=" + x1 + "\n" + "y=" + y1 + "\n" + "z=" + z1);
    console.log("iteration: " + count);
    console.log("x=" + x1 + "\n" + "y=" + y1 + "\n" + "z=" + z1);

}

function gauss_sidel_method() {
    setMatrix();
    var x0 = 0,
        y0 = 0,
        z0 = 0;
    var x1 = 0,
        y1 = 0,
        z1 = 0;
    count = 0;
    do {
        x1 = x_equation(y0, z0);
        y1 = y_equation(x1, z0);
        z1 = z_equation(x1, y1);

        e1 = x1 - x0;
        e2 = y1 - y0;
        e3 = z1 - z0;

        x0 = x1;
        y0 = y1;
        z0 = z1;

        count++;
    } while (e1 > precision && e2 > precision && e3 > precision);
    window.alert("iteration: " + count + "\n" + "x=" + x1 + "\n" + "y=" + y1 + "\n" + "z=" + z1);
    console.log("iteration: " + count);
    console.log("x=" + x1 + "\n" + "y=" + y1 + "\n" + "z=" + z1);
}

// Dealing with Textarea Height
function calcHeight(value) {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    // min-height + lines x line-height + padding + border
    let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
    return newHeight;
}

let textarea = document.querySelector(".resize-ta");
textarea.addEventListener("keyup", () => {
    textarea.style.height = calcHeight(textarea.value) + "px";
});


// function jacobi_method() {
//     var X0 = [0, 0, 0];
//     var X1 = [0, 0, 0];
//     var count = 0;
//     do {
//         for (var i = 0; i < 3; i++) {
//             X0[i] = X1[i];
//         }
//         for (var i = 0; i < 3; i++) {
//             var sum = 0;
//             for (var j = 0; j < 3; j++) {
//                 if (!(i === j)) {
//                     sum = sum + A[i][j] * X0[j];
//                 }
//             }
//             X1[i] = (B[i] - sum) / A[i][i];
//             console.log(X1[i]);
//         }
//         count++;
//         console.log("iteration: " + count);
//     } while (!(((X1[0] - X0[0]) < precision) && ((X1[1] - X0[1]) < precision) && ((X1[2] - X0[2]) < precision)));

//     window.alert("x:" + X1[0] + "\n" + "y:" + X1[1] + "\n " + "z:" + X1[2]);
// }

// function gauss_sidel_method() {
//     var X0 = [0, 0, 0];
//     var X1 = [];
//     var count = 0;
//     var flag = 1;
//     do {

//         for (var i = 0; i < 3; i++) {
//             sum = 0;
//             for (var j = 0; j < 3; j++) {
//                 if (!(i === j)) {
//                     sum += A[i][j] * X0[j];
//                 }
//             }
//             X1[i] = (B[i] - sum) / A[i][i];
//             if ((X1[i] - X0[i]) < precision) {
//                 flag = 0;
//             } else {
//                 X0[i] = X1[i];
//             }
//             //console.log("after" + X1[i]);
//         }
//         count++;
//         console.log("iteration:" + count);
//     }
//     while (flag);

//     window.alert("x:" + X1[0] + " " + "y:" + X1[1] + " " + "z:" + X1[2]);
// }