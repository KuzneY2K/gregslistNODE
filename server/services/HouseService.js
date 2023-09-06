import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";

class HouseService {

    async updateHouse(houseId, updatedHouse) {
        const foundHouse = await dbContext.Homes.findById(houseId)
        foundHouse.description = updatedHouse.description ? updatedHouse.description : foundHouse.description
        foundHouse.bathrooms = updatedHouse.bathrooms ? updatedHouse.bathrooms : foundHouse.bathrooms
        foundHouse.bedrooms = updatedHouse.bedrooms ? updatedHouse.bedrooms : foundHouse.bedrooms
        foundHouse.imgUrl = updatedHouse.imgUrl ? updatedHouse.imgUrl : foundHouse.imgUrl
        await foundHouse.save()
        return (foundHouse)
    }

    async deleteHouse(houseId) {
        const houseToRemove = await dbContext.Homes.findById(houseId)
        if (!houseToRemove) {
            throw new BadRequest('No house identified.')
        }
        await houseToRemove.remove()
        return `Removed ${houseToRemove.year}`
    }

    async getHouse() {
        const house = await dbContext.Homes.find()
        return house
    }

    async createHouse(houseData) {
        const house = await dbContext.Homes.create(houseData)
        return house
    }

}

export const houseService = new HouseService()