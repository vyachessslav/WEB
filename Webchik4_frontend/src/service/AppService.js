import AuthService from "./AuthService";
import AxiosApi from "./AxiosApi";
// import LogoutService from "./LogoutService";

const HITS_URI = "api/v1/hits";

const refreshHandler = (callback) => {
    return AuthService.refresh()
        .then(() => {
            return callback();
        });

};

const AppService = {

    checkHit: async (hit) => {
        const requestBody = JSON.stringify(hit);
        const config = {
            headers: {
                Authorization: `Bearer ${AuthService.getCurrentAccessToken()}`
            }
        };
        return AxiosApi.post(HITS_URI, requestBody, config)
            .catch((error) => {
                return refreshHandler(() => AppService.checkHit(hit));
            })
            .then((response) => {
                return response;
            });
    },
    getAllHits: async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${AuthService.getCurrentAccessToken()}`
            }
        };
        return AxiosApi.get(HITS_URI, config)
            .catch((error) => {
                return refreshHandler(() => AppService.getAllHits());
            })
            .then((response) => {
                return response;
            });
    },
    getAllHitsByR: async (radius) => {
        const config = {
            headers: {
                Authorization: `Bearer ${AuthService.getCurrentAccessToken()}`
            }
        };
        return AxiosApi.get(`${HITS_URI}/${radius}`, config)
            .catch((error) => {
                return refreshHandler(() => AppService.getAllHitsByR(radius));
            })
            .then((response) => {
                return response;
            });
    },
    deleteAllHits: async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${AuthService.getCurrentAccessToken()}`
            }
        };
        return AxiosApi.delete(HITS_URI, config)
            .catch((error) => {
                return refreshHandler(() => AppService.deleteAllHits());
            })
            .then((response) => {
                return response;
            });
    }
};

export default AppService;