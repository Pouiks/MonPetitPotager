import axios from 'axios';
import baseUrl from '../Config/baseUrl'

async function getPlantById (id) {
    try {
        const plant = await axios.get(baseUrl + '/plants/' + id)
        return plant;
    } catch (error) {
        console.error(error);
    }
}

export default getPlantById;
