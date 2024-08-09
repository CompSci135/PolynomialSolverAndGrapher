
function showPolynomial(type) {
    var polynomials = document.getElementsByClassName('polynomial');
    for (var i = 0; i < polynomials.length; i++) {
        polynomials[i].style.display = 'none';
    }
    document.getElementById(type).style.display = 'block';
    document.getElementById('button').style.display = 'block';
}

function hidePolynomials(){
    document.getElementById('button').style.display = 'none';
    var polynomials = document.getElementsByClassName('polynomial');
    for (var i = 0; i < polynomials.length; i++) {
        polynomials[i].style.display = 'none';
    }
}

function calculateRoots(){
    if (document.getElementById('choosequadratic').checked){
        if (document.getElementById("1").value == 0 || document.getElementById("1").value == ""){
            document.getElementById("roots").textContent = "This is not a quadratic equation";
            return;
        }
        else{
            if (document.getElementById("2").value == ""){
                document.getElementById("2").value == 0;
            }
            else if(document.getElementById("3").value == ""){
                document.getElementById("3").value == 0;
            }
            else{
                let L = solveQuadratic(document.getElementById("1").value, document.getElementById("2").value, document.getElementById("3").value);
                if (L[0] instanceof Complex){
                    document.getElementById("root").textContent = "Roots: \n\n"+ L[0]+"\n" +L[1];
                }
                else{
                document.getElementById("root").textContent = "Roots: \n\n"+ L[0].toFixed(2)+"\n" +L[1].toFixed(2) ;
                }
            }
        }
        
        var x = [];
        var y = [];
        for (let i = -100; i<=100; i+=0.5){
            x.push(i);
            y.push(parseFloat(document.getElementById("1").value)*(i**2) + parseFloat(document.getElementById("2").value)*i +parseFloat(document.getElementById("3").value));
        }
        var trace = {
            type: 'scatter',
            mode: 'lines',
            x: x,
            y: y
          };
      
          var layout = {
            title: 'Graph of quadratic equation',
            xaxis: {title: 'X Axis'},
            yaxis: {title: 'Y Axis', rangemode: 'tozero'}
          };
      
          Plotly.newPlot(document.getElementById('graph'), [trace], layout, {showLink: false});
    }
    else if (document.getElementById('choosecubic').checked){
        if (document.getElementById("4").value == 0 || document.getElementById("4").value == ""){
            document.getElementById("roots").textContent = "This is not a cubic equation";
            return;
        }
        else{
            let L = solveCubic(document.getElementById("4").value, document.getElementById("5").value, document.getElementById("6").value , document.getElementById("7").value);
            if (L[1] instanceof Complex){
                document.getElementById("root").textContent = "Roots: \n\n"+L[0] +"\n"+L[1] +"\n"+L[2];
            }
            else{
                document.getElementById("root").textContent = "Roots: \n\n"+L[0].toFixed(4) +"\n"+L[1].toFixed(4) +"\n"+L[2].toFixed(4);
            }


            var x = [];
            var y = [];
            for (let i = -100; i<=100; i+=0.5){
                x.push(i);
                y.push(parseFloat(document.getElementById("4").value)*(i**3)+parseFloat(document.getElementById("5").value)*(i**2) + parseFloat(document.getElementById("6").value)*i +parseFloat(document.getElementById("7").value));
            }
            var trace = {
                type: 'scatter',
                mode: 'lines',
                x: x,
                y: y
            };
        
            var layout = {
                title: 'Graph of cubic equation',
                xaxis: {title: 'X Axis'},
                yaxis: {title: 'Y Axis', rangemode: 'tozero'},
               
            };
        
            Plotly.newPlot(document.getElementById('graph'), [trace], layout, {showLink: false});
        }
    }
    else{
        if (document.getElementById("8").value == 0 || document.getElementById("8").value == ""){
            document.getElementById("roots").textContent = "This is not a quartic equation";
            return;
        }
        else{
            var x = [];
            var y = [];
            for (let i = -100; i<=100; i+=0.5){
                x.push(i);
                y.push(parseFloat(document.getElementById("8").value)*(i**4)+parseFloat(document.getElementById("9").value)*(i**3)+parseFloat(document.getElementById("10").value)*(i**2) + parseFloat(document.getElementById("11").value)*i +parseFloat(document.getElementById("12").value));
            }
            var trace = {
                type: 'scatter',
                mode: 'lines',
                x: x,
                y: y
            };
        
            var layout = {
                title: 'Graph of quartic equation',
                xaxis: {title: 'X Axis'},
                yaxis: {title: 'Y Axis', rangemode: 'tozero'},
               
            };
        
            Plotly.newPlot(document.getElementById('graph'), [trace], layout, {showLink: false});
            //let L = solveQuartic(document.getElementById("8").value, document.getElementById("9").value, document.getElementById("10").value , document.getElementById("11").value, document.getElementById("12").value);
            document.getElementById("root").textContent = " ";

        }
    }
}



class Complex{
    constructor(real,imaginary){
        this.real = real;
        this.imaginary = imaginary;
    }
    toString(){
        if (this.imaginary == 0){
            return `${this.real.toFixed(4)}`;
        }
        else{
        let sign = this.imaginary >= 0 ? '+' : '-';
        let absImaginary = Math.abs(this.imaginary).toFixed(4);
        return `${this.real.toFixed(4)} ${sign} ${absImaginary} i`;
        }
    }
}
function solveQuadratic(a,b,c){
    let delta = b**2 - 4*a*c;
    let L = [];
    if (delta>0){
        let x1 = (-b + Math.sqrt(delta)) / (2*a);
        let x2 = (-b - Math.sqrt(delta)) / (2*a);
        L[0] = x1;
        L[1] = x2;
    }
    else if (delta == 0){
        let x1 = (-b)/(2*a);
        let x2 = (-b)/(2*a);
        L[0] = x1;
        L[1] = x2;
    }
    else{
        let x1 = new Complex (-b/(2*a), Math.sqrt(-delta)/(2*a));
        let x2 = new Complex (-b/(2*a), -Math.sqrt(-delta)/(2*a));
        L[0] = x1;
        L[1] = x2;
    }
    return L;
}

function solveCubic(a,b,c,d){
    let p = (3*a*c - b**2)/(3*(a**2));
    let q = (2*(b**3) - 9*a*b*c +27*d*(a**2))/(27*(a**3));
    let delta = (q/2)**2 + (p/3)**3;

    let L = [];

    if (delta>0){
        let u = Math.cbrt(-(q/2) + Math.sqrt(delta));
        let v = Math.cbrt(-(q/2) - Math.sqrt(delta));
        let t1 = new Complex(u+v + (-b/(a*3)), 0);
        let t2 = new Complex(-0.5*(u+v) + (-b/(a*3)) , (Math.sqrt(3) / 2)*(u - v));
        let t3 = new Complex(-0.5*(u+v) + (-b/(a*3)) , -(Math.sqrt(3) / 2)*(u - v));
        L[0] = t1;
        L[1] = t2;
        L[2] = t3;
    }
    else if (delta == 0){
        let u = Math.cbrt(-(q/2) + Math.sqrt(delta));
        let v = Math.cbrt(-(q/2) - Math.sqrt(delta));
        let t = u+v -b/(3*a);
        L[0] = t;
        L[1] = t;
        L[2] = t;
    }
    else{
        let theta = Math.acos((q/2)*Math.sqrt(-27/(p**3)));
        theta = (1/3)*theta;
        let t1 = 2*Math.cos(theta)*Math.sqrt(-p/3) -b/(3*a);
        let t2 = 2*Math.cos(theta + 2*Math.PI/3)*Math.sqrt(-p/3) -b/(3*a);
        let t3 = 2*Math.cos(theta - 2*Math.PI/3)*Math.sqrt(-p/3) -b/(3*a);
        L[0] = t1;
        L[1] = t2;
        L[2] = t3;
    }
    return L;
}



