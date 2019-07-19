---
layout: default
weight: 201706
---
<p>
<center> <h3 class="page-title">Partial Data Extraction via Noisy Histogram Queries: Information Theoretic Bounds </h3> </center>
	<center><b> Wei-Ning Chen </b> and I-Hsiang Wang <br />
	<i>IEEE International Symposium on Information Theory 2017</i>  <br />
	<a href="/paper/isit17_NHQ.pdf">[ISIT paper]</a>
	<a href="/paper/isit17_NHQ_slides_v8.pdf">[Slides]</a></center>
</p>

<div class="row">
<div class="column_pic">
	<img src="/images/NHQ_model.png" alt="NHQ" style="width: 100%" class="center" />
	<img src="/images/NHQ_results.png" alt="NHQ" style="width: 100%" class="center" />
</div>
<div class="column_text">
The considered data set is a collection of $n$ items, each of which carries a piece of categorical data taking values in a finite alphabet. Data analysts are allowed to query the data set through a curator by specifying a subset of items and then obtaining the histogram of the queried subset. The (unnormalized) histogram released by the curator, however, is perturbed by some additive noise with maximum magnitude $\delta_n$. The goal of the data analyst is to reconstruct the categorical data set such that the Hamming distance between the reconstructed and the actual one is smaller than a tolerance parameter $k_n$. 
In this work, we explore the fundamental limit on the minimum number of queries $T_n^*$ required for the analyst to reconstruct the $n$-item data set within $k_n$ tolerance subject to $\delta_n$ noisy perturbation. 
We first show that if $\delta_n = O(\sqrt{k_n})$, the minimum query complexity $T^*_n = \Theta(n/\log n)$, where the achievability is based on random sampling, and the converse is based on counting and packing arguments. 
On the other hand, if $\delta_n = \Omega( k_n^{(1+\epsilon)/2})$ for some $\epsilon > 0$, we prove that $T_n^* = \omega(n^p)$ for any positive integer $p$. In other words, no querying methods with polynomial-in-$n$ query complexity can successfully reconstruct the data set in that regime. This impossibility result is established by a novel combinatorial lower bound on $T_n^*$. 
</div>
</div>