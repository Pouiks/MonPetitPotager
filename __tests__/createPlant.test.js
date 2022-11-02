import getLoginToken from '../src/Services/login';
import createPlant from '../src/Services/createPlant';

describe("Create a new plant",  () => {
    it("add a new plant to the database", async () => {
        const token = await getLoginToken("admin@admin.com", "admin");
        const plant = {
            name: "cerise",
            category: 1,
            description: "fruit rouge",
            density: 1,
            waterQuantity: 1,
            startSowingMonth: "janvier",
            endSowingMonth: "mars",
            startHarvestMonth: "juin",
            endHarvestMonth: "septembre",
            imageUrl: "",
            climatId: 1
            }
        const newPlant = await createPlant(plant, token);
        expect(newPlant.data).toBe('Plant created with climat')
    })
})