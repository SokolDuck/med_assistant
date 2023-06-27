import jwt_decode from "jwt-decode";


export function isSignedIn() {
    const token = getCookie("token");

    if (token === "") {
        return false;
    } else {
        const data = jwt_decode(token);
        console.log("parsed data: ", data);

        const date = new Date();
        if (data["exp"] < date.getTime() / 1000) {
            console.log("expired ", data["exp"], "now: ", date.getTime())
            return false;
        }
    }

    return true;
}


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export function getAuthToken() {
    const token = getCookie("token");

    if (token === "") {
        return null;
    } else {
        return token;
    }
}
