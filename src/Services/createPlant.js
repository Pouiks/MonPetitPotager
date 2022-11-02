import baseUrl from '../Config/baseUrl'
import axios from 'axios';

async function createPlant (plant, token) {
    const newPlant = await axios.post(baseUrl + "/plants/create", plant,
        {
            headers: {"Authorization" : `Bearer ${token}`}
        }
        )
       return newPlant
   }

   export default createPlant;