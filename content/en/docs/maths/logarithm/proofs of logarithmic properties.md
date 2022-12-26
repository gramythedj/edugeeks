---
title: "Proofs of Logarithmic properties"
date: 25-12-2022
weight: 2
url: /proofs-of-Logarithmic-properties/
mathjax: true
---



**1) Product Rule: Log<sub>a</sub> xy = log<sub>a</sub> x+ log<sub>a</sub> y**

**proof:**

let log<sub>a</sub> x = m, log<sub>a</sub> y = n

convert these logarithms into exponents

x=a<sup>m</sup> and y=a<sup>n</sup>

multiply the above equations

xy=a<sup>m</sup> * a<sup>n</sup>

Using the property b<sup>p</sup> * b<sup>q</sup>=b<sup>p+q</sup> from exponents we can write the above equation as follows

xy=a<sup>m+n</sup>

Convert back into logarithm

log<sub>a</sub> xy = m+n

on substituting the values m= log<sub>a</sub> x and n =log<sub>a</sub> y we get	

log<sub>a</sub> xy = log<sub>a</sub> x + log<sub>a</sub> y

**2) Quotient Rule: Log<sub>a</sub> $\frac{x}{y}$ =log<sub>a</sub> x- log<sub>a</sub> y**

**proof:**

let log<sub>a</sub> x = m, log<sub>a</sub> y = n

convert these logarithms into exponents

x=a<sup>m</sup> and y=a<sup>n</sup>

divide the above equations

$\frac{x}{y}$ = $\frac{a^m}{a^n}$

using the property b<sup>p</sup>/b<sup>q</sup>=b<sup>p-q</sup> from exponents we can write the above equation as follows

$\frac{x}{y}$=a<sup>m-n</sup>

convert into logarithm

log<sub>a</sub> $\frac{x}{y}$=m-n

on substituting the m= log<sub>a</sub> x & n =log<sub>a</sub> y we get

log<sub>a</sub> (xy)=log<sub>a</sub> x - log<sub>a</sub> y

**3) Power Rules:**

**i) log<sub>b</sub> $a^m$ = m log<sub>b</sub> a**

**Proof:**

let x=log<sub>b</sub> a

convert logarithm into exponent

b<sup>x</sup>=a

taking both sides of the equation to m'th power

(b<sup>x</sup>)<sup>m</sup>=a<sup>m</sup>

using the property (a<sup>m</sup>)<sup>n</sup>=a<sup>mn</sup> from exponents we can write the above equation as follows

b<sup>xm</sup>=a<sup>m</sup>

convert back to logarithm

xm=log<sub>b</sub> a<sup>m</sup>

substitute x=log<sub>b</sub> a back in the equation and interchanging

log<sub>b</sub> a<sup>m</sup> = m log<sub>b</sub> a

**ii) log<sub>b<sup>n</sup></sub> a= $\frac{1}{n}$ log<sub>b</sub> a**

**proof:**

let log<sub>b<sup>n</sup></sub> a=x

convert this into exponential form

a=(b<sup>n</sup>)<sup>x</sup>

use exponential property 

(a<sup>m</sup>)<sup>n</sup>=a<sup>mn</sup>=(a<sup>n</sup>)<sup>m</sup>

a=(b<sup>x</sup>)<sup>n</sup>

use the property if  a<sup>m</sup>=b then a=b<sup>$\frac{1}{m}$</sup>  from exponents we can write the above equation as follows

a<sup>$\frac{1}{n}$</sup>=b<sup>x</sup>

interchanging and converting into logarithmic form

 b<sup>x</sup>=a<sup>$\frac{1}{n}$</sup> 

 x=log<sup>b</sup> a<sup>$\frac{1}{n}$</sup> 

substitute the value of x=log<sub>b<sup>n</sup></sub> a and use logarithmic property log<sub>b</sub> a<sup>m</sup>= m log<sub>b</sub> a

log<sub>b<sup>n</sup></sub> a= $\frac{1}{n}$ log<sub>b</sub> a

**4) log of 1 rule: log<sub>b</sub> 1=0**

**Proof:**

from exponents we have:

b<sup>0</sup>=1

convert this into logarithmic form

0=<sub>b</sub> 1

**5) Change of Base Rule: log<sub>b</sub> a= $\frac{log_x a}{log_x b}$**

**Proof:**

let log<sub>x</sub> a=p, log<sub>x</sub> b=q

Convert these logarithms into exponential forms

a=x<sup>p</sup> and b=x<sup>q</sup>

Substituting in the Left hand side of the to solve into right hand side of the Rule

L.H.S. : log<sub>b</sub> a= log<sub>x<sup>n</sup></sub> x<sup>m</sup>

Using the power rule: log<sub>n<sup>q</sup></sub> a<sup>p</sup>= $\frac{p}{q}$ $log_b$ a
	
log<sub>b</sub> a= $\frac{p}{q}$ log<sub>x</sub> x

Using the Rule log<sub>a</sub> a=1
	
Log<sub>b</sub> a= $\frac{p}{q}$

Substituting the assumed p= $log_x$ a,  q= $log_x$ b

Log<sub>b</sub> a= $\frac{log_x a}{log_x b}$

**6) log<sub>b</sub> $\frac{1}{a}$ =log<sub>$\frac{1}{b}$</sub> a= -log<sub>b</sub> a**

**Proof:**

i) Log<sub>b</sub> (1/a)=log<sub>b</sub> a<sup>-1</sup>

Using the property log<sub>a</sub> b<sup>m</sup>=m log<sub>a</sub> b =-log<sub>b</sub> a

ii) log<sub>$\frac{1}{b}$</sub> a=log<sub>$b^{-1}$</sub> a

log<sub>b</sub> $\frac{1}{a}$ =log<sub>$\frac{1}{b}$</sub> a= -log<sub>b</sub> a  



**7) a<sup>log<sub>a</sub> x</sup> = x**

**Proof:**

Let  p=a<sup>log<sub>a</sub> x</sup>

Converting the above exponent into logarithm

Log<sub>a</sub> p = log<sub>a</sub> x

Using he property if log<sub>b</sub> a= log<sub>b</sub> c then a=c

p=x

But we assumed p=a<sup>log<sub>a</sub> x</sup>

Therefore a<sup>log<sub>a</sub> x</sup> = x

