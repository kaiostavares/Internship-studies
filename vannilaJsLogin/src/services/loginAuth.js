//fake authorizedService, this is just a very simple example
// On JWT token or others, study about cookies 

async function loginUser(email, password, remember){
   try {
      const response = await fakeResponseToLoginRequest(email, password);
      if (response.token) {
         if (remember) {
            localStorage.setItem("token", response.token);
         } else {
            sessionStorage.setItem("token", response.token);
         }
         } else {
            throw new Error(response.error || 'Login failed');
         }
   } catch (error) {
      throw error;  
   }
}

function isUserAuthenticated(){
   const token = localStorage.getItem("token") || sessionStorage.getItem("token");
   return isTokenValid(token);
}

function logoutUser(){
   localStorage.removeItem("token");
   sessionStorage.removeItem("token");
}

// fakeResponseTo a login request
async function fakeResponseToLoginRequest(email, password){
   try {
      const response = await fetch('/data/fakeUsers.json');
      if (!response.ok) throw new Error('Network response was not ok');
      const fakeUsers = await response.json();
      const user = fakeUsers.find(user => user.email === email && user.password === password);

      if (user) {
         return { token: "fake-jwt-token" };
      }
      return { error: "Invalid email or password" };
   } catch (error) {
      console.error('Error fetching users:', error);
      return { error: 'Server error' };
   }
}

function isTokenValid(token){
   return token === "fake-jwt-token";
}

export { loginUser, isUserAuthenticated, logoutUser };
