---
title: "latex example"
date: 30-11-2022
weight: 3
mathjax: true
---




<script src="https://i.upmath.me/latex.js"></script>
<h1>Upmath: Math Online Editor</h1>
<h3><em>Create web articles and blog posts with equations and diagrams</em></h3>
<p>Upmath extremely simplifies this task by using Markdown and LaTeX. It converts the Markdown syntax extended with LaTeX equations support into HTML code you can publish anywhere on the web.</p>

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
