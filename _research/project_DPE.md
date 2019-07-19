---
layout: default
weight: 201511
---
<p>
<center> <h3 class="page-title">Differentially Private Parameter Estimation from Distributed Sources </h3> </center>
	<center>with Janet Sung <br />
	  under supervision of Prof. I-Hsiang Wang at EE department, NTU <br />
	<a href="/paper/project_DPE.pdf">[Technical Report]</a></center>
</p>

<div class="row">
<div class="column_pic">
	<img src="/images/DPE_result.png" alt="DPE" style="width: 100%" class="center" />
</div>
<div class="column_text">
Consider the problem of parameter estimation with data collected from $M$ parties, each party holding $N$ copies of identically and independently distributed (i.i.d.) samples. In many circumstances, parties are not willing to reveal their private information, so the released data will be $\epsilon$-differential private. In this paper, we propose two algorithms to estimate parameter: for general dataset with the number of samples satisfying $M = o\left( N^2\right)$ and the privacy parameter satisfying $\epsilon=\Omega\left( N^{1/6}M^{-1/3}\right)$, we proposed subsample-and-aggregate estimator, which is asymptotically efficient (i.e. its MSE is asymptotically equal to Fisher information).  On the other hand, if the underlying distributions are from exponential family and if $\epsilon=\Omega\left( 1/N\right)$, we showed that sufficient-statistic-averaging is always efficient as $N$ goes to infinity. Our results showed that as long as the number of parties does not grow too fast, one can guarantee differential privacy for free, without sacrificing the performance of estimation.
</div>
</div>