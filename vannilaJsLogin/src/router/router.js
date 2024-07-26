import { loadHTML, removeOldStyles, loadStyle, loadScript } from "./pageLoader.js";
import { isUserAuthenticatedGuard, canAcessLoginGuard} from "../guards/userAuthGuard.js";
const routes = {
  "/": {
    template: "/src/pages/home/home.html",
    script: "/src/pages/home/home.js",
    style: "/src/pages/home/home.css",
    guard: isUserAuthenticatedGuard
  },
  "/login": {
    template: "/src/pages/login/login.html",
    script: "/src/pages/login/login.js",
    style: "/src/pages/login/login.css",
    guard: canAcessLoginGuard
  },
};

async function router() {
  const path = window.location.pathname.toLowerCase() || "/";
  const route = routes[path] || {
      template: "/src/pages/notFound/notFound.html",
      script: "/src/pages/notFound/notFound.js",
      style: "/src/pages/notFound/notFound.css",
  };

  if (route.guard) {
    const canAccess = await route.guard();
  if (path === "/login" && !canAccess) {
      navigate("/");
      return;
    }

    console.log("oi");
    if (!canAccess) {
      navigate("/login");
      return;
    }
  }

  removeOldStyles();
  loadStyle(route.style);
  await loadHTML(route.template);
  loadScript(route.script);
}

function navigate(url) {
  window.history.pushState(null, "", url);
  router();
}
export { navigate, router };