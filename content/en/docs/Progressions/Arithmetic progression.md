---
title: "Arithmetic progression"
date: 09-12-2022
weight: 1
url: /Arithmetic-progression/
mathjax: true
---


A progression in which the difference between any two consecutive terms his always as same fixed quantity, such a progression is called **arithmetic progression** or simply **AP**. And the fixed difference is called common difference.

If **a** is the first time and **t** is the common difference then general AP form is:

a, a+t, a+2t, a+3t ……..

Where we denote terms as follows:

$a_1$ = a

$a_2$ = a+t 

$a_3$ = a+ 2t and so on.

General term $a_n$ = a+(n-1)t . That is $a_n$ is the $n^th$ term with **a** being the first term and **t** is the common difference.

Examples of AP

1) 1,2,3,4,5,6,7……..

2) 1,3,5,7,9….

3) 9,6,3,0,-3….

4) 1,11,21,31,....

### Sum of first n terms of AP

**statment:** Let $S_n$ be the sum of first n terms of AP $a_1,a_2,a_3,.......a_n$ then $S_n$ = $\frac{n}{2}[2a+(n-1)t]$ = $\frac{n}{2}[a_1+a_n]$

**Proof:**

Given the AP, $a_1,a_2,a_3,.......a_n$

$$S_n = a_1 + a_2 + a_3 + ...... + a_n$$

$$S_n = a + (a+t) + (a+2t) + ….. + [a+ (n-1)t]$$

$$S_n = \sum_{r=1}^n[a+(n-1)t]$$

$$S_n=\sum_{r=1}^{n} a + \sum_{r=1}^{n}(n-1)t $$

As **a** and **t** are constants we can take them out of summation

$$S_n = a \sum_{r=1}^{n} 1 + t \sum_{r=1}^{n} (n-1)$$

$$Here \sum_{r=1}^{n} 1 = n \ because\ 1\ is\ added\ n\ times$$

$$S_n = a n + t [\sum_{r=1}^{n} n - \sum_{r=1}^{n} 1]$$

$$And\ we\ know\ that\ sum\ of\ first\ n\ natural\ numbers\ i.e. \sum_{r=1}^{n} n = \frac{n(n+1)}{2}$$

$$S_n = a n + t [ \frac{n(n+1)}{2} - n]$$

$$S_n = n [ a + t (\frac{(n+1)}{2} -1)]$$

$$S_n = n [ a + t \frac{(n-1)}{2} ]$$

$$S_n = \frac{n}{2} [ 2a + t (n-1)]$$

### Points to be noted

1) If every term in an AP is multiplied by a constant k then new series will also be in AP with common difference kt
2) If every term in an AP is added with k then the new series will be in AP with common difference (k+t)

### Arithmetic Mean (AM)

**Definition:** If $a_1, a_2, a_3, …..a_n$ are real numbers then $\frac{a_1 + a_2 + a_3 + ….. + a_n}{n}$ is called arithmetic mean of a_1, a_2, a_3, …..a_n.

In such AM we can observe something interesting. AM of any two numbers make another AP

i.e. if A is the AM of **a** and **b** then

a, A, b are in AP
