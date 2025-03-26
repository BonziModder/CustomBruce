class n extends HTMLElement {
   static preload() {
      import("./connect-221663ff.js?module").then(function (n) { return n.c });
   }

   connectedCallback() {
      if (this.renderRoot) return;
      if (this.renderRoot = this.attachShadow({ mode: "open" }), !n.isSupported || !n.isAllowed) {
         this.toggleAttribute("install-unsupported", !0),
         this.renderRoot.innerHTML = n.isAllowed ?
            "<slot name='unsupported'>Sorry, your browser does not support installing ESP devices. Please use Chrome or Edge.</slot>" :
            "<slot name='not-allowed'>Only HTTPS websites or localhost can install ESP devices. Please try again.</slot>";
         return;
      }

      this.toggleAttribute("install-supported", !0);
      this.addEventListener("mouseover", n.preload);
      const e = document.createElement("slot");
      e.addEventListener("click", async (n) => {
         n.preventDefault();
         (await import("./connect-221663ff.js?module").then(function (n) { return n.c })).connect(this);
      }), e.name = "activate";

      const t = document.createElement("button");
      t.innerText = "CONNECT";
      e.append(t);
      if ("adoptedStyleSheets" in Document.prototype && "replaceSync" in CSSStyleSheet.prototype) {
         const e = new CSSStyleSheet;
         e.replaceSync(n.style), this.renderRoot.adoptedStyleSheets = [e];
      } else {
         const e = document.createElement("style");
         e.innerText = n.style, this.renderRoot.append(e);
      }
      this.renderRoot.append(e);
   }
}

n.isSupported = "serial" in navigator;
n.isAllowed = window.isSecureContext;
n.style = `
   button {
      position: relative;
      cursor: pointer;
      font-size: 14px;
      padding: 8px 28px;
      color: var(--esp-tools-button-text-color, #fff);
      background-color: var(--esp-tools-button-color, #03a9f4);
      border: none;
      border-radius: 4px;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12), 0 1px 5px 0 rgba(0,0,0,.2);
   }
   button:hover {
      box-shadow: 0 4px 8px 0 rgba(0,0,0,.14), 0 1px 7px 0 rgba(0,0,0,.12), 0 3px 1px -1px rgba(0,0,0,.2);
   }
   button:focus {
      outline: none;
   }
   :host([active]) button {
      color: rgba(0, 0, 0, 0.38);
      background-color: rgba(0, 0, 0, 0.12);
      box-shadow: none;
      cursor: unset;
      pointer-events: none;
   }
`;
customElements.define("esp-web-install-button", n);
