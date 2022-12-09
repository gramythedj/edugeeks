---
title: "Geometric progression"
date: 09-12-2022
weight: 2
url: /Geometric-progression/
mathjax: true
---

**Statement:** A progression in which the ratio of two consecutive terms is always same constant, such a progression is called **geometric progression** or simply called
GP. and the constant ratio is called **common ratio** 

i.e. if $a_1,a_2,a_3,.......a_n$ are in GP then 

$$\frac{a_2}{a_1}=\frac{a_3}{a_2}=\frac{a_4}{a_3}=\frac{a_5}{a_4}=.........$$

General form of GP is $a, ar, ar^2, ar^3, ar^4 ..........$ where

first term is $a_1=a$

second term is $a_2=ar$

third term is $a_3=ar^2$
........

$n^{th}$ term is $a_n=ar^{n-1}$

### Sum of n terms of a GP

**Statement:** 
1) sum of first n terms of a geometric progression is $S_n= \frac{a(r^n-1)}{r-1}$ when r $\neq$ 1
2) if r=1 then $S_n$ = a + a + a + a + a + a +. . . . (n terms) = na
3) if |r|<1 and n = $\infty$ then $S_n = \frac{a}{1-r}$

**Proof:**
1) $$S_n= a + ar + ar^2 + ar^3 + ar^4 .........+ ar^{n-1}-----------(1)$$
 now multiply common ration **r** on both sides of the equation
 
 $$ r S_n = ar + ar^2 + ar^3 + ar^4 +ar^5.........+ ar^n------------(2)$$
 
 let's subtract equation (1) from equation (2)
 
 $$S_n- r S_n= [a + ar + ar^2 + ar^3 + ar^4 .........+ ar^{n-1}] - [ ar + ar^2 + ar^3 + ar^4 +ar^5.........+ ar^n]$$
 
 by rearrangimg we get 
 
 $$(1- r) S_n= [a + (ar-ar) + (ar^2-ar^2) + (ar^3-ar^3) +  .........+ (ar^{n-1}-r^{n-1})- ar^n]$$
 
 $$(1- r) S_n= [a- ar^n]$$
 
 $$ S_n= \frac{a(1- r^n)}{1-r}$$
 
 3) given |r|<1 and n = $\infty$ 

from the above proof we can write 

$$ S_n= \frac{a(1- r^n)}{1-r}$$

as |r|<1 and n = $\infty$ then $r^n = 0$

$$ S_n= \frac{a(1- 0)}{1-r}$$

$$ S_n= \frac{a}{1-r}$$

