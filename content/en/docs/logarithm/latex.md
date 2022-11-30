---
title: "latex example"
date: 30-11-2022
weight: 3
---




<script src="https://i.upmath.me/latex.js"></script>
<h1>Upmath: Math Online Editor</h1>
<h3><em>Create web articles and blog posts with equations and diagrams</em></h3>
<p>Upmath extremely simplifies this task by using Markdown and LaTeX. It converts the Markdown syntax extended with LaTeX equations support into HTML code you can publish anywhere on the web.</p>
<p><img src="/i/latex.jpg" alt="Paper written in LaTeX"></p>
<h2>Markdown</h2>
<p>Definition from <a href="https://en.wikipedia.org/wiki/Markdown">Wikipedia</a>:</p>
<blockquote>
<p>Markdown is a lightweight markup language with plain text formatting syntax designed so that it can be converted to HTML and many other formats using a tool by the same name. Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.</p>
</blockquote>
<p>The main idea of Markdown is to use a simple plain text markup. It’s <s>hard</s> easy to <strong>make</strong> <strong>bold</strong> <em>or</em> <em>italic</em> text. Simple equations can be formatted with subscripts and superscripts: <em>E</em><sub>0</sub>=<em>mc</em><sup>2</sup>. I have added the LaTeX support: $$E_0=mc^2$$.</p>
<p>Among Markdown features are:</p>
<ul>
<li>images (see above);</li>
<li>links: <a href="/" title="link title">service main page</a>;</li>
<li>code: <code>untouched equation source is *E*~0~=*mc*^2^</code>;</li>
<li>unordered lists–when a line starts with <code>+</code>, <code>-</code>, or <code>*</code>;
<ol>
<li>sub-lists</li>
<li>and ordered lists too;</li>
</ol>
</li>
<li>direct use <nobr>of HTML</nobr>–for <span style="color: red">anything else</span>.</li>
</ul>
<p>In addition, Upmath supports typographic replacements: © ® ™ ± !!! ??? ,  – —</p>
<h2>LaTeX</h2>
<p>Upmath converts LaTeX equations in double-dollars <code>$$</code>: $$ax^2+bx+c=0$$. All equations are rendered as block equations. If you need inline ones, you can add the prefix <code>\inline</code>: $$\inline p={1\over q}$$. Place big equations on separate lines:</p>
<p>$$x_{1,2} = {-b\pm\sqrt{b^2 - 4ac} \over 2a}.$$</p>
<p>In this case the LaTeX syntax will be highlighted in the source code. You can even add equation numbers (unfortunately there is no automatic numbering and refs support):</p>
<p>$$|\vec{A}|=\sqrt{A_x^2 + A_y^2 + A_z^2}.$$(1)</p>
<p>It is possible to write Cyrillic symbols in <code>\text</code> command: $$Q_\text{плавления}&gt;0$$.</p>
<p>One can use matrices:</p>
<p>$$T^{\mu\nu}=\begin{pmatrix}
\varepsilon&amp;0&amp;0&amp;0\\
0&amp;\varepsilon/3&amp;0&amp;0\\
0&amp;0&amp;\varepsilon/3&amp;0\\
0&amp;0&amp;0&amp;\varepsilon/3
\end{pmatrix},$$</p>
<p>integrals:</p>
<p>$$P_\omega={n_\omega\over 2}\hbar\omega\,{1+R\over 1-v^2}\int\limits_{-1}^{1}dx\,(x-v)|x-v|,$$</p>
<p>cool tikz-pictures:</p>
<p>$$\usetikzlibrary{decorations.pathmorphing}
\begin{tikzpicture}[line width=0.2mm,scale=1.0545]\small
\tikzset{&gt;=stealth}
\tikzset{snake it/.style={-&gt;,semithick,
decoration={snake,amplitude=.3mm,segment length=2.5mm,post length=0.9mm},decorate}}
\def\h{3}
\def\d{0.2}
\def\ww{1.4}
\def\w{1+\ww}
\def\p{1.5}
\def\r{0.7}
\coordinate[label=below:$A_1$] (A1) at (\ww,\p);
\coordinate[label=above:$B_1$] (B1) at (\ww,\p+\h);
\coordinate[label=below:$A_2$] (A2) at (\w,\p);
\coordinate[label=above:$B_2$] (B2) at (\w,\p+\h);
\coordinate[label=left:$C$] (C1) at (0,0);
\coordinate[label=left:$D$] (D) at (0,\h);
\draw[fill=blue!14](A2)--(B2)-- ++(\d,0)-- ++(0,-\h)--cycle;
\draw[gray,thin](C1)-- +(\w+\d,0);
\draw[dashed,gray,fill=blue!5](A1)-- (B1)-- ++(\d,0)-- ++(0,-\h)-- cycle;
\draw[dashed,line width=0.14mm](A1)--(C1)--(D)--(B1);
\draw[snake it](C1)--(A2) node[pos=0.6,below] {$c\Delta t$};
\draw[-&gt;,semithick](\ww,\p+0.44*\h)-- +(\w-\ww,0) node[pos=0.6,above] {$v\Delta t$};
\draw[snake it](D)--(B2);
\draw[thin](\r,0) arc (0:atan2(\p,\w):\r) node[midway,right,yshift=0.06cm] {$\theta$};
\draw[opacity=0](-0.40,-0.14)-- ++(0,5.06);
\end{tikzpicture}$$</p>
<p>plots:</p>
<p>$$\begin{tikzpicture}[scale=1.0544]\small
\begin{axis}[axis line style=gray,
	samples=120,
	width=9.0cm,height=6.4cm,
	xmin=-1.5, xmax=1.5,
	ymin=0, ymax=1.8,
	restrict y to domain=-0.2:2,
	ytick={1},
	xtick={-1,1},
	axis equal,
	axis x line=center,
	axis y line=center,
	xlabel=$x$,ylabel=$y$]
\addplot[red,domain=-2:1,semithick]{exp(x)};
\addplot[black]{x+1};
\addplot[] coordinates {(1,1.5)} node{$y=x+1$};
\addplot[red] coordinates {(-1,0.6)} node{$y=e^x$};
\path (axis cs:0,0) node [anchor=north west,yshift=-0.07cm] {0};
\end{axis}
\end{tikzpicture}$$</p>
<p>and <a href="https://en.wikibooks.org/wiki/LaTeX/Mathematics">the rest of LaTeX features</a>.</p>
<p><strong>1) Product Rule: Log<sub>a</sub> xy = log<sub>a</sub> x+ log<sub>a</sub> y</strong></p>
<p><strong>proof:</strong></p>
<p>let log<sub>a</sub> x = m, log<sub>a</sub> y = n</p>
<p>convert these logarithms into exponents</p>
<p>x=a<sup>m</sup> and y=a<sup>n</sup></p>
<p>multiply the above equations</p>
<p>xy=a<sup>m</sup> * a<sup>n</sup></p>
<p>Using the property b<sup>p</sup> * b<sup>q</sup>=b<sup>p+q</sup> from exponents we can write the above equation as follows</p>
<p>xy=a<sup>m+n</sup></p>
<p>Convert back into logarithm</p>
<p>log<sub>a</sub> xy = m+n</p>
<p>on substituting the values m= log<sub>a</sub> x and n =log<sub>a</sub> y we get</p>
<p>log<sub>a</sub> xy = log<sub>a</sub> x + log<sub>a</sub> y</p>
<p><strong>2) Quotient Rule: Log<sub>a</sub> x/y=log<sub>a</sub> x- log<sub>a</sub> y</strong></p>
<p><strong>proof:</strong></p>
<p>let log<sub>a</sub> x = m, log<sub>a</sub> y = n</p>
<p>convert these logarithms into exponents</p>
<p>x=a<sup>m</sup> and y=a<sup>n</sup></p>
<p>divide the above equations</p>
<p>$\frac{x}{y}$ = $\frac{a<sup>m}{a</sup>n}$</p>
<p>using the property b<sup>p</sup>/b<sup>q</sup>=b<sup>p-q</sup> from exponents we can write the above equation as follows</p>
<p>$\frac{x}{y}$=a<sup>m-n</sup></p>
<p>convert into logarithm</p>
<p>log<sub>a</sub> $\frac{x}{y}$=m-n</p>
<p>on substituting the m= log<sub>a</sub> x &amp; n =log<sub>a</sub> y we get</p>
<p>log<sub>a</sub> (xy)=log<sub>a</sub> x - log<sub>a</sub> y</p>
<p><strong>3) Power Rules:</strong></p>
<p><strong>i) log<sub>b</sub> (a^m)= m log<sub>b</sub> a</strong></p>
<p><strong>Proof:</strong></p>
<p>let x=log<sub>b</sub> a</p>
<p>convert logarithm into exponent</p>
<p>b<sup>x</sup>=a</p>
<p>taking both sides of the equation to m’th power</p>
<p>(b<sup>x</sup>)<sup>m</sup>=a<sup>m</sup></p>
<p>using the property (a<sup>m</sup>)<sup>n</sup>=a<sup>mn</sup> from exponents we can write the above equation as follows</p>
<p>b<sup>xm</sup>=a<sup>m</sup></p>
<p>convert back to logarithm</p>
<p>xm=log<sub>b</sub> a<sup>m</sup></p>
<p>substitute x=log<sub>b</sub> a back in the equation and interchanging</p>
<p>log<sub>b</sub> a<sup>m</sup> = m log<sub>b</sub> a</p>
<p><strong>ii) log<sub>b<sup>n</sup></sub> a= 1/n log<sub>b</sub> a</strong></p>
<p><strong>proof:</strong></p>
<p>let log<sub>b<sup>n</sup></sub> a=x</p>
<p>convert this into exponential form</p>
<p>a=(b<sup>n</sup>)<sup>x</sup></p>
<p>use exponential property</p>
<p>(a<sup>m</sup>)<sup>n</sup>=a<sup>mn</sup>=(a<sup>n</sup>)<sup>m</sup></p>
<p>a=(b<sup>x</sup>)<sup>n</sup></p>
<p>use the property if  a<sup>m</sup>=b then a=b<sup>$\frac{1}{m}$</sup>  from exponents we can write the above equation as follows</p>
<p>a<sup>$\frac{1}{n}$</sup>=b<sup>x</sup></p>
<p>interchanging and converting into logarithmic form</p>
<p>b<sup>x</sup>=a<sup>$\frac{1}{n}$</sup></p>
<p>x=log<sup>b</sup> a<sup>$\frac{1}{n}$</sup></p>
<p>substitute the value of x=log<sub>b<sup>n</sup></sub> a and use logarithmic property log<sub>b</sub> a<sup>m</sup>= m log<sub>b</sub> a</p>
<p>log<sub>b<sup>n</sup></sub> a=1/n log<sub>b</sub> a</p>
<p><strong>4) log of 1 rule: log<sub>b</sub> 1=0</strong></p>
<p><strong>Proof:</strong></p>
<p>from exponents we have:</p>
<p>b<sup>0</sup>=1</p>
<p>convert this into logarithmic form</p>
<p>0=<sub>b</sub> 1</p>
<p><strong>5) Change of Base Rule: log<sub>b</sub> a= log<sub>x</sub> a/ log<sub>x</sub> b</strong></p>
<p><strong>Proof:</strong></p>
<p>let log<sub>x</sub> a=p, log<sub>x</sub> b=q</p>
<p>Convert these logarithms into exponential forms</p>
<p>a=x<sup>p</sup> and b=x<sup>q</sup></p>
<p>Substituting in the Left hand side of the to solve into right hand side of the Rule</p>
<p>L.H.S. : log<sub>b</sub> a= log<sub>x<sup>n</sup></sub> x<sup>m</sup></p>
<p>Using the power rule: log<sub>n<sup>q</sup></sub> a<sup>p</sup>=p/q log_b a</p>
<p>log<sub>b</sub> a=p/q log<sub>x</sub> x</p>
<p>Using the Rule log<sub>a</sub> a=1</p>
<p>Log<sub>b</sub> a=p/q</p>
<p>Substituting the assumed p=log_x a,  q=log_x b</p>
<p>Log<sub>b</sub> a=log<sub>x</sub> a/log<sub>x</sub> b</p>
<p><strong>6) log<sub>b</sub> $\frac{1}{a}$=log<sub>$\frac{1}{b}$</sub> a= -log<sub>b</sub> a</strong></p>
<p><strong>Proof:</strong></p>
<p>i) Log<sub>b</sub> (1/a)=log<sub>b</sub> a<sup>-1</sup></p>
<p>Using the property log<sub>a</sub> b<sup>m</sup>=m log<sub>a</sub> b =-log<sub>b</sub> a</p>
<p>ii) log<sub>$\frac{1}{b}$</sub> a=log<sub>b&lt;sup-1</sup></sub> a</p>
<p>log<sub>b</sub> $\frac{1}{a}$=log<sub>$\frac{1}{b}$</sub> a= -log<sub>b</sub> a</p>
<p><strong>7) a<sup>log<sub>a</sub> x</sup> = x</strong></p>
<p><strong>Proof:</strong></p>
<p>Let  p=a<sup>log<sub>a</sub> x</sup></p>
<p>Converting the above exponent into logarithm</p>
<p>Log<sub>a</sub> p = log<sub>a</sub> x</p>
<p>Using he property if log<sub>b</sub> a= log<sub>b</sub> c then a=c</p>
<p>p=x</p>
<p>But we assumed p=a<sup>log<sub>a</sub> x</sup></p>
<p>Therefore a<sup>log<sub>a</sub> x</sup> = x</p>