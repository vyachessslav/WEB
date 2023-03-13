import {store} from "../redux/store";
import {setLoggedIn} from "../redux/actions";


const LogoutService = {
    logout: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("email");
        store.dispatch(setLoggedIn(false));
    }
}

export default LogoutService;