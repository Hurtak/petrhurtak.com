---
title: Components
description: Collection of UI components used on this page
publication_date: 2015-12-01 13:37:00
last_update: 2015-05-28 19:22:57
visible: 1
---


<h2>General</h2>

<ul>
  <li>use 2 space indentation</li>
</ul>


<h2>Article metadata</h2>

<ul>
  <li>each article starts with YAML front matter block which specifies articles metadata</li>
  <li>all properties are mandatory</li>
</ul>

<h3>Code</h3>

<pre><xmp data-lang="yaml">
  ---
  title: "Title of the article"
  description: Short description of article
  publication_date: "2015-07-02 13:37:00"
  last_update: 2015-05-28 19:20:00
  visible: 1
  ---
</xmp></pre>


<h2>Headings</h2>

<ul>
  <li>headings have automatically added id's for easier sharing</li>
</ul>

<h3>Code</h3>

<pre><xmp data-lang="html">
  <h2>Heading</h2>
  <h3>Sub-heading</h3>
</xmp></pre>

<h3>Compiles to</h3>

<pre><xmp data-lang="html">
  <h2 id="heading">Heading</h2>
  <h3 id="sub-heading">Sub-heading</h3>
</xmp></pre>

<h3>How it looks like</h3>

<h2>Heading</h2>
<h3>Sub-heading</h3>


<h2>Formatting</h2>

<h3>Code</h3>

<pre><xmp data-lang="html">
  <em>italics text</em>
  <strong>bold text</strong>
  <mark>marked text</mark>
  <s>striked text</s>
</xmp></pre>

<h3>How it looks like</h3>

<ul>
  <li><em>italics text</em></li>
  <li><strong>bold text</strong></li>
  <li><mark>marked text</mark></li>
  <li><s>striked text</s></li>
</ul>


<h2>Images</h2>

<ul>
  <li>when linking to article images use relative paths without <xmp>./</xmp> at the start of the url</li>
  <li>these relative url are then transformed into absolute paths <xmp>images/test.png</xmp> → <xmp>/static/articles/../images/test.png</xmp></li>
</ul>

<h3>Code</h3>

<pre><xmp data-lang="html">
  <!-- just image -->
  <img src="./images/test.png" alt="image alt text">

  <!-- image with caption -->
  <figure>
    <img src="./images/test.png" alt="image alt text">
    <figcaption>Image caption</figcaption>
  </figure>
</xmp></pre>

<h3>Compiles to</h3>

<pre><xmp data-lang="html">
  <!-- just image -->
  <img src="/static/articles/2015/12/components/images/test.png" alt="image alt text">

  <!-- image with caption -->
  <figure>
    <img src="/static/articles/2015/12/components/images/test.png" alt="image alt text">
    <figcaption>Image caption</figcaption>
  </figure>
</xmp></pre>

<h3>How it looks like</h3>

<img src="./images/test.png" alt="image alt text">

<figure>
  <img src="./images/test.png" alt="image alt text">
  <figcaption>Image caption</figcaption>
</figure>


<h2>Lists</h2>

<ul>
  <li>start list items with lower case letter</li>
  <li>do not end list items with dot, add new list item instead or use parentheses</li>
</ul>

<h3>Code</h3>

<pre><xmp data-lang="html">
  <!-- unordered list -->
  <ul>
    <li>first item</li>
    <li>second item
      <ul>
        <li>nested item
          <ul>
            <li>deeply nested item</li>
            <li>deeply nested item</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>third item</li>
  </ul>

  <!-- ordered list -->
  <ol>
    <li>first item</li>
    <li>second item
      <ol>
        <li>nested item
          <ol>
            <li>deeply nested item</li>
            <li>deeply nested item</li>
          </ol>
        </li>
      </ol>
    </li>
    <li>third item</li>
  </ol>
</xmp></pre>

<h3>How it looks like</h3>

<ul>
  <li>first item</li>
  <li>second item
    <ul>
      <li>nested item
        <ul>
          <li>deeply nested item</li>
          <li>deeply nested item</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>third item</li>
</ul>

<!-- ordered list -->
<ol>
  <li>first item</li>
  <li>second item
    <ol>
      <li>nested item
        <ol>
          <li>deeply nested item</li>
          <li>deeply nested item</li>
        </ol>
      </li>
    </ol>
  </li>
  <li>third item</li>
</ol>


<h2>Code blocks</h2>

<ul>
  <li>put code in <xmp>xmp</xmp> blocks instad of <xmp>code</xmp> blocks</li>
  <li>this is so we can have nice previews on github without having to manually do HTML escaping</li>
  <li><xmp>xmp</xmp> blocks are the compiled indo <xmp>code</xmp></li>
  <li>content of code blocks is HTML escaped</li>
  <li>when possible, add <xmp>data-lang</xmp> attribute with what language is code snippet written in</li>
  <li>do not use abbreviations in this attribute, use <xmp>javascript</xmp> instead of <xmp>js</xmp></li>
  <li>whitespace at the start & end of the <xmp>xmp</xmp> block is trimmed</li>
  <li>omit semicolons in javascript language</li>
  <li>use 2 space indentation</li>
</ul>

<h3>Code</h3>

<pre><xmp data-lang="html">
  <!-- inline code -->
  <p>Some text, <xmp><h1>hello</h1></xmp>.</p>

  <!-- multiline code -->
  <pre><xmp data-lang="html">
    function foo (bar) {
      return bar * 2
    }
  </xmp></pre>
</xmp></pre>

<h3>Compiles to</h3>

<pre><xmp data-lang="html">
  <!-- inline code -->
  <p>Some text, <code>&lt;h1&gt;hello&lt;/h1&gt;</code>.</p>

  <!-- multiline code -->
  <pre><code data-lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params">bar</span>) </span>{
    <span class="hljs-keyword">return</span> bar * <span class="hljs-number">2</span>
  }</code></pre>
</xmp></pre>

<h3>How it looks like</h3>

<p>Some text, <xmp><h1>hello</h1></xmp>.</p>

<pre><xmp data-lang="javascript">
  function foo (bar) {
    return bar * 2
  }
</xmp></pre>



<h2>Tables</h2>

<ul>
  <li>start headings and cell text with lower case letter</li>
  <li>if there is heading row, wrap it in <xmp>thead</xmp> and regular rows in <xmp><tbody></xmp></li>
  <li>in <xmp>thead</xmp> use <xmp>th</xmp> instead of <xmp>td</xmp></li>
  <li>if there is not heading row, do not wrap rows in <xmp><tbody></xmp></li>
</ul>

<h3>Code</h3>

<pre><xmp data-lang="html">
<table>
  <thead>
    <tr>
      <th>heading</th>
      <th>heading</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cell text</td>
      <td>Cell text</td>
    </tr>
  </tbody>
</table>
</xmp></pre>

<h3>How it looks like</h3>

<table>
  <thead>
    <tr>
      <th>heading</th>
      <th>heading</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cell text</td>
      <td>Cell text</td>
    </tr>
  </tbody>
</table>



<h2>Quotes</h2>

<h3>Code</h3>

<pre><xmp data-lang="html">
  <blockquote>
    <p>Citation text</p>
    <footer>
      &mdash; <a href="https://hurtak.cz"><cite>Petr Huřťák</cite></a></footer>
  </blockquote>
</xmp></pre>

<h3>How it looks like</h3>

<blockquote>
  <p>Citation text</p>
  <footer>&mdash; <a href="https://hurtak.cz"><cite>Petr Huřťák</cite></a></footer>
</blockquote>



<h2>Typography</h2>

<table>
  <thead>
    <tr>
      <th>wrong</th>
      <th>correct</th>
      <th>HTML</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>"quoted 'text'"</td>
      <td>“quoted ‘text’”</td>
      <td><xmp data-lang="html">&lsquo;</xmp> <xmp data-lang="html">&rsquo;</xmp> <xmp data-lang="html">&ldquo;</xmp> <xmp data-lang="html">&rdquo;</xmp></td>
    </tr>
    <tr>
      <td>...</td>
      <td>…</td>
      <td><xmp data-lang="html">&hellip;</xmp></td>
    </tr>
    <tr>
      <td>--, ---</td>
      <td>–, —</td>
      <td><xmp data-lang="html">&ndash;</xmp>, <xmp data-lang="html">&mdash;</xmp></td>
    </tr>
    <tr>
      <td>a -> b</td>
      <td>a → b</td>
      <td><xmp data-lang="html">&rarr;</xmp></td>
    </tr>
    <tr>
      <td>2 - 1</td>
      <td>2 − 4</td>
      <td><xmp data-lang="html">&minus;</xmp></td>
    </tr>
    <tr>
      <td>2 x 4</td>
      <td>2 × 4</td>
      <td><xmp data-lang="html">&times;</xmp></td>
    </tr>
    <tr>
      <td>+-</td>
      <td>±</td>
      <td><xmp data-lang="html">&pm;</xmp></td>
    </tr>
    <tr>
      <td>1/2, 1/4, 3/4</td>
      <td>½, ¼, ¾</td>
      <td><xmp data-lang="html">&half;</xmp>, <xmp data-lang="html">&frac14;</xmp>, <xmp data-lang="html">&frac34;</xmp></td>
    </tr>
    <tr>
      <td>(c) (C)</td>
      <td>©</td>
      <td><xmp data-lang="html">&copy;</xmp></td>
    </tr>
    <tr>
      <td>(tm) (TM)</td>
      <td>™</td>
      <td><xmp data-lang="html">&trade;</xmp></td>
    </tr>
    <tr>
      <td>(r) (R)</td>
      <td>®</td>
      <td><xmp data-lang="html">&reg;</xmp></td>
    </tr>
  </tbody>
</table>

