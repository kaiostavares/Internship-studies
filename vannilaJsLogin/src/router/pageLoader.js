export async function loadHTML(template) {
  const response = await fetch(template);
  const html = await response.text();
  document.getElementById("app").innerHTML = html;
}

export function removeOldStyles() {
  const oldStyles = document.querySelectorAll('link[rel="stylesheet"]');
  oldStyles.forEach((link) => {
    if (!link.hasAttribute("id") || link.getAttribute("id") !== "principal") {
      link.remove();
    }
  });
}

export function loadStyle(style) {
  if (style) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = style;
    document.head.appendChild(link);
  }
}

export function loadScript(script) {
  if (script) {
    const scriptElement = document.createElement("script");
    scriptElement.src = script;
    scriptElement.type = "module";
    document.body.appendChild(scriptElement);
  }
}
