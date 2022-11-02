import getPlantById from '../src/Services/getPlantById';

describe("Try to get plant by id",  () => {
    it("calls get function and return one plant as an object", async () => {
        const plant = await getPlantById(1);
        expect(plant.data.plant).toEqual(expect.objectContaining({
            id: 1
        }))
        expect(typeof plant.data.plant.name).toBe("string")
        expect(typeof plant.data.plant.description).toBe("string")
        expect(typeof plant.data.plant.density).toBe("number")
        expect(typeof plant.data.plant.water_quantity).toBe("number")
    })
})
