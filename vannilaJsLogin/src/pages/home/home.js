import { logoutUser } from "../../services/loginAuth.js";
import { navigate } from "../../router/router.js";

document.getElementById('logout').addEventListener('click', () => {
   logoutUser();
   navigate('/login');
});