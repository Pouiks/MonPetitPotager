import axios from 'axios';
import baseUrl from '../Config/baseUrl'

async function getAuth (token) {
    const data = await axios.post(
    baseUrl + '/authorization',null,
        {
        headers:
            {"Authorization" : `Bearer ${token}`}
        }
    )
    return data;
}
export default getAuth;