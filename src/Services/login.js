
import axios from 'axios';
import baseUrl from '../Config/baseUrl'


 async function getLoginToken (email, password) {

    try {
        const getToken = await axios.post(baseUrl + '/login', {
            email,
            password
        }, )
        return getToken;
    } catch(error) {
        console.log(error)
    }
}

export default getLoginToken;

