# Sanov Theorem

**This is a note for Sanov theorem on Polish space $\mathcal{X}$**

$$
\newcommand{\aaaa}{\mathrm{(a)}}
\newcommand{\bbbb}{\mathrm{(b)}}
\newcommand{\cccc}{\mathrm{(c)}}
\newcommand{\dddd}{\mathrm{(d)}}
\newcommand{\eeee}{\mathrm{(e)}}
\newcommand{\ffff}{\mathrm{(f)}}
\newcommand{\gggg}{\mathrm{(g)}}
\newcommand{\hhhh}{\mathrm{(h)}}
\newcommand{\iiii}{\mathrm{(i)}}
\newcommand{\jjjj}{\mathrm{(j)}}
\newcommand{\kkkk}{\mathrm{(k)}}
\newcommand{\llll}{\mathrm{(l)}}
\newcommand{\mmmm}{\mathrm{(m)}}
\newcommand{\nnnn}{\mathrm{(n)}}
\newcommand{\oooo}{\mathrm{(o)}}
\newcommand{\pppp}{\mathrm{(p)}}
\newcommand{\qqqq}{\mathrm{(q)}}
\newcommand{\rrrr}{\mathrm{(r)}}
\newcommand{\ssss}{\mathrm{(s)}}
\newcommand{\tttt}{\mathrm{(t)}}

\newcommand{\lp}{\left(}
\newcommand{\rp}{\right)}
\newcommand{\lb}{\left[}
\newcommand{\rb}{\right]}
\newcommand{\lbp}{\left\{}
\newcommand{\rbp}{\right\}}
\newcommand{\lba}{\left\lvert}
\newcommand{\rba}{\right\rvert}
\newcommand{\lnorm}{\left\lVert}
\newcommand{\rnorm}{\right\rVert}
\newcommand{\mv}{\middle\vert}
\newcommand{\ul}{\underline}
\newcommand{\ol}{\overline}
\newcommand{\mcal}{\mathcal}
\newcommand{\mscr}{\mathscr}
\newcommand{\what}{\widehat}
\newcommand{\wtild}{\widetilde}
\newcommand{\mb}{\mathbf}
\newcommand{\mbb}{\mathbb}
\newcommand{\msf}{\mathsf}
\newcommand{\la}{\leftarrow}
\newcommand{\ra}{\rightarrow}
\newcommand{\ua}{\uparrow}
\newcommand{\da}{\downarrow}
\newcommand{\lra}{\leftrightarrow}
\newcommand{\lgla}{\longleftarrow}
\newcommand{\lgra}{\longrightarrow}
\newcommand{\lglra}{\longleftrightarrow}
\newcommand{\lan}{\langle}
\newcommand{\ran}{\rangle}
\newcommand{\llan}{\left\langle}
\newcommand{\rran}{\right\rangle}
\newcommand{\lce}{\left\lceil}
\newcommand{\rce}{\right\rceil}
\newcommand{\lfl}{\left\lfloor}
\newcommand{\rfl}{\right\rfloor}

\newcommand{\emphb}{\textcolor{blue}}
\newcommand{\emphg}{\textcolor{Grass}}
\newcommand{\emphr}{\textcolor{red}}
\newcommand{\eqFunc}{\overset{\mathrm{f}}{=}}
\newcommand{\eqDef}{\triangleq}
\newcommand{\diid}{\overset{\text{i.i.d.}}{\sim}}

\newcommand{\etal}{{\it et al.}}
\newcommand{\E}{\mathbb{E}}
\newcommand{\Var}{\mathsf{Var}}
\newcommand{\Cov}{\mathsf{Cov}}
\newcommand{\Bias}{\mathsf{Bias}}
\newcommand{\MSE}{\mathsf{MSE}}
\newcommand{\MLE}{\mathsf{MLE}}
\newcommand{\Risk}{\mathsf{R}}
\renewcommand{\Pr}{\mathbb{P}}
\newcommand{\Ber}{\mathrm{Ber}}
\newcommand{\Binom}{\mathrm{Binom}}
\newcommand{\Unif}{\mathrm{Unif}}
\newcommand{\SNR}{\mathsf{SNR}}
\newcommand{\INR}{\mathsf{INR}}
\newcommand{\SINR}{\mathsf{SINR}}
\newcommand{\Pe}{\mathsf{P}_{\mathsf{e}}}
\newcommand{\uPe}{\mathsf{\ol{P}}_{\mathsf{e}}}
\newcommand{\lPe}{\mathsf{\ul{P}}_{\mathsf{e}}}
\newcommand{\eps}{\varepsilon}
\newcommand{\Indc}[1]{\mathbbm{1}_{\lbp #1\rbp}}
\newcommand{\Q}[1]{\mathrm{Q}\lp #1 \rp}
\newcommand{\FT}{\breve}
\newcommand{\ZT}{\check}
\newcommand{\sinc}{\mathrm{sinc}}
\newcommand{\rect}{\mathrm{rect}}
\newcommand{\argmin}{\mathop{\mathrm{argmin}}}
\newcommand{\argmax}{\mathop{\mathrm{argmax}}}
\newcommand{\dH}{\mathsf{d_H}}
\newcommand{\wei}{\mathsf{w}}
\newcommand{\herm}{\mathtt{H}}

\newcommand{\MI}[2]{{I}\left( #1\,; #2\, \right)}
\newcommand{\varMI}[1]{{\mathsf{I}}\left( #1\,\right)}
\newcommand{\CMI}[3]{{I}\left( #1\,; #2\, \middle\vert\, #3 \right)}
\newcommand{\ET}[1]{{H}\left( #1\,\right)}
\newcommand{\CET}[2]{{H}\left( #1\, \middle\vert #2\, \right)}
\newcommand{\ETR}[1]{\mcal{H}\left( #1\,\right)}
\newcommand{\tildeETR}[1]{\widetilde{\mcal{H}}\left( #1\,\right)}
\newcommand{\KLD}[2]{{D}\left( #1\, \middle\Vert #2 \right)}
\newcommand{\DET}[1]{{h}\left( #1\,\right)}
\newcommand{\CDET}[2]{{h}\left( #1\, \middle\vert #2\, \right)}
$$

<u>***Theorem ( Sanov )***</u>
Let  $X_1,X_2,...,X_n$ be i.i.d. real-valued random variables,  $\Pi_{x^n} \eqDef \sum_i\mathsf{I}_{\{x = X_i\}} $  be the empirical distribution of $X^n$, and $\mcal{A} \in \mathcal{P_X}$. Then
$$
\begin{align}
\limsup_{n\to\infty} \frac{1}{n} \log \mbb{P}\lbp  \Pi_{x^n} \in \mcal{A}\rbp 
&\leq -\inf_{\mu \in \bar{\mcal{A}}} \KLD{\mu}{P_X} \\
&\leq -\inf_{\mu \in \mcal{A}^o} \KLD{\mu}{P_X} \\
&\leq \liminf_{n\to\infty} \frac{1}{n} \log \mbb{P}\lbp  \Pi_{x^n} \in \mcal{A}\rbp \tag{1}

\end{align}
$$









