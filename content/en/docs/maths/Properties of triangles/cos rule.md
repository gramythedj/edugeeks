---
title: "cos rules or Laws of cos"
date: 13-12-2022
url: /cos-rule-or-Laws-of-cos/
mathjax: true
---

Cos rule or law of cos states that in A $\triangle$ ABC a, b and c are lengths of sides BC CA and AB. Then 

$$a^2=b^2+c^2-2bc \ Cos \ A$$

$$b^2=a^2+c^2-2ac\ Cos\ B$$

$$c^2=a^2+b^2-2ab\ Cos\ C$$

$$Or$$

$$cos\ B= \frac{a^2+c^2-b^2}{2ac}$$

$$cos\ C= \frac{b^2+a^2-c^2}{2ba}$$

$$cos\ A= \frac{b^2+c^2-a^2}{2bc}$$


It seems like a different form of Pythagoras theorem for every triangle doesn't it?

**Proof:**

Let’s consider a $\triangle$ ABC as shown in the figure with a, b and c being the lengths of the sides BC, CA and AB. we can represent the triangle vectorically as
shown in the diagram. That means $\vec{AB}$, $\vec{BC}$ and $\vec{AC}$ are forming the triangle so we can understand that | $\vec{AB}$ | = c, | $\vec{BC}$ | = a and | $\vec{AC}$ | =  b.

<img src="/docs/images/cos rule image2.jpg" width="400" height="600">

From the triangle we can write that

$$\vec{AC}=\vec{AB}+\vec{BC}$$

Apply mod on both sides

$$| \vec{AC} |=| \vec{AB} + \vec{BC} |$$

$$ b = | \vec{AB} + \vec{BC} |$$

From vectors we have $| \vec{x} + \vec{y} | = \sqrt {x^2+y^2+2xy\ cos(\vec{x},\vec{y})}$

To find the angle between $\vec{AB}$ and $\vec{BC}$ lets extend the $\vec{AB}$ so that both vector tails meet. Let $\alpha$ be the angle between those two vectors. 

(note: we extended the vector to find the angle between two vectors by not considering B as angle, because angle between two vectors is angle made by vectors when both heads meet or tails meet but not one tail and one head)

<img src="/docs/images/cos rule image4.jpg" width="400" height="600">

From the above figure we can find $\alpha$

$$\alpha + B=180^0$$

$$\alpha =180^0 - B $$

Therefore, 

$$ b = | \vec{AB} + \vec{BC} |$$

$$ b =\sqrt{ | \vec{AB}|^2 +| \vec{BC} |^2 +2 | \vec{AB}  | |\vec{BC}| cos(\vec{AB} , \vec{BC})}$$

$$ b =\sqrt{ c^2 + a^2 +2 ca\ cos(\alpha)}$$

$$ b =\sqrt{ c^2 + a^2 +2 ca\ cos(180^0 - B)}$$

$$ b =\sqrt{ c^2 + a^2 -2 ca\ cos\ B}$$

$$b^2=a^2+c^2-2ac\ Cos\ B$$

Hence proved.

Now we can extend this proof by simplification and we can write

$$cos\ B= \frac{a^2+c^2-b^2}{2ac}$$

Similarly we can do the same for the other two angles and we can prove the other two equations of cos rule
