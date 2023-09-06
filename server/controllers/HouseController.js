import { houseService } from "../services/HouseService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";

export class HouseController extends BaseController {
    constructor() {
        super('api/homes')
        this.router
            .post('', this.createHouse)
            .get('', this.getHouse)
            .delete('/:houseId', this.deleteHouse)
            .put('/:houseId', this.updateHouse)
    }

    async createHouse(request, response, next) {
        try {
            logger.log('creating house ', request.body)
            const house = await houseService.createHouse(request.body)
            response.send(house)
        } catch (error) {
            next(error)
        }
    }

    async getHouse(request, response, next) {
        try {
            logger.log('getting house(s)')
            const house = await houseService.getHouse()
            response.send(house)
        } catch (error) {
            next(error)
        }
    }

    async deleteHouse(request, response, next) {
        try {
            logger.log('deleting')
            const message = await houseService.deleteHouse(request.params.houseId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }

    async updateHouse(request, response, next) {
        try {
            logger.log('updating')
            const houseId = request.params.houseId
            const updatedHouse = request.body
            const updateHouse = await houseService.updateHouse(houseId, updatedHouse)
            response.send(updateHouse)
        } catch (error) {
            next(error)
        }
    }
}