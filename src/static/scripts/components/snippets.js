window.App.Snippets = (function() {
  "use strict";

  const config = {
    snippetAttribute: "data-snippet",
    isSelectedClass: "isSelected",
    isVisibleClass: "isVisible",
    iframeClass: "Snippet-iframe",
    debounceIframeCreation: 300
  };

  function init(data = []) {
    if (!data || data.length < 1) return;

    for (const snippetData of data) {
      const snippetElms = document.querySelectorAll(
        `[${config.snippetAttribute}="${snippetData.metadata.name}"]`
      );
      if (!snippetElms.length) {
        window.App.Log.error(
          "Snippets",
          `Snippet with name "${
            snippetData.metadata.name
          }" can't be found in the DOM.`
        );
        continue;
      }

      for (const snippetEl of snippetElms) {
        if (snippetData.config.inlineSnippet) continue;
        buildSnippet(snippetData, snippetEl);
      }
    }
  }

  function buildSnippet(snippetData, snippetEl) {
    const dom = {
      controls: {
        result: snippetEl.querySelector(".js-snippet-tab-result"),
        html: snippetEl.querySelector(".js-snippet-tab-html"),
        css: snippetEl.querySelector(".js-snippet-tab-css"),
        js: snippetEl.querySelector(".js-snippet-tab-js"),
        reset: snippetEl.querySelector(".js-snippet-reset")
      },
      content: {
        result: snippetEl.querySelector(".js-snippet-content-result"),
        html: snippetEl.querySelector(".js-snippet-content-html"),
        css: snippetEl.querySelector(".js-snippet-content-css"),
        js: snippetEl.querySelector(".js-snippet-content-js")
      }
    };

    const state = {
      html: snippetData.content.html,
      css: snippetData.content.css,
      js: snippetData.content.js,
      timeout: null
    };

    function showContentCurried(clickedTab, contentToShow) {
      showContent(
        dom.content,
        dom.controls,
        clickedTab,
        contentToShow,
        config.isSelectedClass,
        config.isVisibleClass
      );
    }

    // switch to result tab
    showContentCurried(dom.controls.result, dom.content.result);

    // fill textareas
    dom.content.html.value = state.html;
    dom.content.css.value = state.css;
    dom.content.js.value = state.js;

    // listeners for tab switching
    dom.controls.result.addEventListener("click", () =>
      showContentCurried(dom.controls.result, dom.content.result)
    );
    dom.controls.html.addEventListener("click", () =>
      showContentCurried(dom.controls.html, dom.content.html)
    );
    dom.controls.css.addEventListener("click", () =>
      showContentCurried(dom.controls.css, dom.content.css)
    );
    dom.controls.js.addEventListener("click", () =>
      showContentCurried(dom.controls.js, dom.content.js)
    );

    // listen for reset button click
    dom.controls.reset.addEventListener("click", () => {
      dom.content.html.value = snippetData.content.html;
      dom.content.css.value = snippetData.content.css;
      dom.content.js.value = snippetData.content.js;

      createSnippetIframe(
        dom.content.result,
        snippetData.metadata.base,
        snippetData.content.head,
        snippetData.content.html,
        snippetData.content.css,
        snippetData.content.js
      );
    });

    // listen on textarea change and update snippet result
    function debounceSnippetIframeUpdate(textareaToUpdate, value) {
      window.clearTimeout(state.timeout);
      state.timeout = window.setTimeout(() => {
        state[textareaToUpdate] = value;
        createSnippetIframe(
          dom.content.result,
          snippetData.metadata.base,
          snippetData.content.head,
          state.html,
          state.css,
          state.js
        );
      }, config.debounceIframeCreation);
    }

    dom.content.html.addEventListener("input", e =>
      debounceSnippetIframeUpdate("html", e.target.value)
    );
    dom.content.css.addEventListener("input", e =>
      debounceSnippetIframeUpdate("css", e.target.value)
    );
    dom.content.js.addEventListener("input", e =>
      debounceSnippetIframeUpdate("js", e.target.value)
    );
  }

  function showContent(
    content,
    controls,
    clickedTab,
    contentToShow,
    classSelected,
    classVisible
  ) {
    for (const key in content) {
      content[key].classList.remove(classVisible);
    }
    contentToShow.classList.add(classVisible);

    for (const key in controls) {
      controls[key].classList.remove(classSelected);
    }
    clickedTab.classList.add(classSelected);
  }

  function createSnippetIframe(targetEl, base, head, html, css, js) {
    // TODO: keep in sync with server side ./utils/articles.js
    const snippetHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <base href="${base}">
          ${head}
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;

    const iframe = document.createElement("iframe");
    iframe.classList.add(config.iframeClass);

    targetEl.innerHTML = "";
    targetEl.appendChild(iframe);

    const iframeDocument = iframe.contentDocument;
    iframeDocument.open();
    iframeDocument.write(snippetHtml);
    iframeDocument.close();
  }

  return {
    init: init
  };
})();
