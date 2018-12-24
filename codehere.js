
function getData(){

    var k =document.getElementById("ltype").value;     /*window.prompt("Enter the type of line as -short-, -medium-,-mediumt-, -long-");*/
    
    
    
    var l= document.getElementById("length").value;
    var z= document.getElementById("impedance").value;
    var y=document.getElementById("admi").value;
    
    
    
    
    
    l= parseInt(l);
    //z= parseInt(z);// complex parsing
    z= math.complex(z);
    //y= parseInt(y);
    y= math.complex(y);
    
    var A,B,C,D,Z,Y,Zc,d;
    switch(k){
    case 'short':
        Z= math.multiply(z, l);
        A= math.complex('1'); // complex definition
        B=Z;
        C=math.complex('0');// complex definition
        D=A;
        break;
    case 'medium':
        Z=math.multiply(z, l);
        Y=math.multiply(y,l);
        //A= 1+ 0.5*Y*Z;
        A= math.multiply(Y,Z);
        A=math.multiply(A,0.5);
        A= math.add(A,1);
        B=Z;
        //C= Y*(1+0.25*Y*Z);
        C=math.multiply(Y,Z);
        C=math.multiply(0.25,C);
        C= math.add(C,1);
        C=math.multiply(C,Y);
        // D parameter
        D=A;
        break;
    case 'mediumt':
        //Z=z*l;
        Z=math.multiply(z, l);
        //Y=y*l;
        Y=math.multiply(y,l);
        //A= 1+0.5*Y*Z;
        A= math.multiply(Y,Z);
        A=math.multiply(A,0.5);
        A= math.add(A,1);
    
        //B=Z*(1+0.25*Y*Z);
        B=math.multiply(Y,Z);
        B=math.multiply(0.25,B);
        B= math.add(B,1);
        B=math.multiply(B,Y);
    
    
        //C and D
        C=Y;
        D=A;
        break;
    
    
    case 'long':
        
        /*Z=z*l;
    Zc=sqrt(z/y);
    d=sqrt(y*z);
    Y=y*l;
    A=cosh(d*l);
    B=Zc*sinh(d*l);
    C=sinh(d*l)/Zc;
    D=A;*/

    
        //Z=z*l;
        Z=math.multiply(z, l);
        Y=math.multiply(y,l);
        //
        //Zc= Math.sqrt(z/y);
        Zc=math.divide(z,y);
        
        //SQRT
        d= math.multiply(y,z);
        d=math.sqrt(d);
    
    
    //A
        A=math.multiply(d,l);
        B=A;
        C=B;
        A=math.cosh(A);
    
        //B=Zc*(math.sinh(d*l));
        B= math.sinh(B);
        B= math.multiply(B,Zc);
    
        C= math.sinh(C);
        //C= C/Zc;
        C= math.divide(C,Zc);
        D=A;
    
    // CHECK HERE
    
        break;
    default:
        alert("Invalid Input");
    }
    
    
    
    
    
    
    /*make seperate function*/
    
    
    var ch= window.prompt("Enetr 1 to enter recieving end values or 2 to enter sending end values :");
            switch(ch){
                case '1':
                //complex parsing is a must
    
                    var v_r= window.prompt("Enter recieving end voltage :");
                    v_r= math.complex(v_r);
    
                    var i_r= window.prompt("Enter recieving end current :");
                    i_r=math.complex(i_r);
    
                    // Mathematical expression
                  /*  v_s= A*v_r + B*i_r;
                    i_s= C*v_r + D*i_r;*/
    
                    //Expression 1
                 var v_s= math.multiply(A,v_r);
                    var temp= math.multiply(B,i_r);
                    v_s= math.add(v_s,temp);
                    // Expression 2
                   var i_s= math.multiply(D,i_r);
                   temp= math.multiply(C,v_r);
                   i_s= math.add(temp, i_s);
    
    
    
    /* formulae is doubtful*/

    /*v_s=input(&#39;Enter sending end voltage :&#39;);
i_s=input(&#39;Enter sending end current :&#39;);
t=A*D-B*C
v_r= (D*v_s - B*i_s)/t;
i_r= (-C*v_s + A*i_s)/t;*/ 
    
                    break;
                case '2':
                 var v_s= window.prompt("Enter sending end voltage :");
                 v_s=math.complex(v_s);
                 var i_s= window.prompt("Enter sending End current :");
                 i_s=math.complex(i_s);
                 var t= math.multiply(A,D);
                 var t2= math.multiply(B,C);
                 t=math.subtract(t,t2);
                 // mathematical operation
                var v_r= math.multiply(D,v_s);
                t2=math.multiply(B,i_s);

                v_r= math.subtract(v_r,t2);
                v_r= math.divide(v_r,t);
                
                // Expression 2
                var i_r= math.multiply(C,-1);
                i_r= math.multiply(i_r,v_s);
                t2= math.multiply(A,i_s);
                i_r= math.add(i_r, t2);
                i_r= math.divide(i_r,t);
    /*Vr=(A*Vs)+(B*Is); 
            Ir=(C*Vs)+(D*Is); */
    
                    break;
                        }
    
                       // end of switch statement
            // get the absolute value
    
            var r= math.abs(v_s);
            var s=math.abs(v_r);
            var t= math.abs(i_s);
            var u= math.abs(i_r);
            var w= math.abs(A);
    
        
    
    //populate to html
    
            var voltageRegulation= (((r/w)-s)/s)*100;
            var sa=math.arg(v_s)-math.arg(i_s); 
            var ra= math.arg(v_r)-math.arg(i_r);
            var pfs=Math.cos(sa);
            var pfr=Math.cos(ra); 
            var Pin= r*t*pfs; 
            var Pin= Pin*(Math.sqrt(3));
            var Pout= (Math.sqrt(3))*s*u*pfr; 
            var Eff=(Pout/Pin)*100;
            Eff= Eff.toFixed(4);
            voltageRegulation= voltageRegulation.toFixed(4);
    
    
            A.re= A.re.toFixed(2);
            A.im= A.im.toFixed(2);
    
            B.re= B.re.toFixed(2);
            B.im= B.im.toFixed(2);
            C.re= C.re.toFixed(2);
            C.im= C.im.toFixed(2);

            
    
    // cell node to display abcd parameters first convert to string*/
    document.write('<table style="color: #333; padding:1em; margin:auto;font-family: arial, sans-serif; border-collapse: collapse;width: 100%;"><caption style="font-size:30px; padding:25px; margin:2px;"> A-B-C-D Parameters ( ' +k+ ' )</caption><tr style="background: black; padding:2em;"> <th style="border: 1px solid #dddddd;text-align: center;background-color: #342F44;color: white; padding: 15px; ">A</th> <th style="border: 1px solid #dddddd;text-align: center;background-color: #342F44;color: white; padding: 15px;">B</th> <th style="border: 1px solid #dddddd;text-align: center;background-color: #342F44;color: white;padding: 15px; ">C</th> <th style="border: 1px solid #dddddd;text-align: center;background-color: #342F44;color: white; padding: 15px;">D</th> </tr> <tr style="padding: 2em;"> <td style="border: 1px solid #dddddd;text-align: center;padding: 15px;">'+ A.re+'+j'+A.im+'</td><td style="border: 1px solid #dddddd;text-align: center;padding: 15px;">'+ B.re+'+j'+B.im+'</td><td style="border: 1px solid #dddddd;text-align: center;padding: 15px;">'+ C.re+'+j'+C.im+'</td><td style="border: 1px solid #dddddd;text-align: center;padding: 15px;">'+ D.re+'+j'+D.im+'</td></tr></table>' );
    document.write('<h3 style="font-size:25px;color:#333;text-align:center; padding:25px; margin:auto;font-family: arial, sans-serif;">Voltage Regulation </h3>');
    document.write('<p style="font-family: Montserrat, sans-serif;text-align:center; padding: 10px;"> Voltage regulation='+ voltageRegulation+' % </p>');

    document.write('<h3 style="font-size:25px; color:#333;text-align:center;padding:25px; margin:auto;font-family: arial, sans-serif;">Efficiency </h3>');
    document.write('<p style="font-family: Montserrat, sans-serif;text-align:center; padding: 10px;"> Efficiency='+Eff+' % </p>');

    document.write('<h3 style="font-size:25px; color:#333;text-align:center;padding:25px; margin:auto;font-family: arial, sans-serif;">Sending End </h3>');
    document.write('<p style="font-family: Montserrat, sans-serif;text-align:center; padding: 10px;"> Sending end voltage :'+r.toFixed(2)+' V  & sending end current :'+t.toFixed(4)+' A</p>');
    document.write('<h3 style="font-size:25px; color:#333;text-align:center;padding:25px; margin:auto;font-family: arial, sans-serif;">Receiving End </h3>');
    document.write('<p style="font-family: Montserrat, sans-serif;text-align:center; padding: 10px;"> Receiving end voltage :'+s.toFixed(2)+' V  & receiving end current :'+u.toFixed(4)+' A</p>');


                    }	
    