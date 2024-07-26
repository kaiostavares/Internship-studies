import { isUserAuthenticated } from "../services/loginAuth.js";

export async function isUserAuthenticatedGuard() {
   return isUserAuthenticated();
}

export async function canAcessLoginGuard(){
   return !isUserAuthenticated();
}
