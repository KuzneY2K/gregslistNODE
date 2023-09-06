import BaseController from "../utils/BaseController.js";
import { Logger, logger } from "../utils/Logger.js";
import { jobService } from "../services/JobService.js";

export class JobController extends BaseController {
    constructor() {
        super('api/jobs')
        this.router
            .get('', this.getJobs)
            .post('', this.createJob)
            .put('/:jobId', this.updateJob)
            .delete('/:jobId', this.deleteJob)
    }

    async getJobs(request, response, next) {
        try {
            logger.log('getting houses')
            const jobs = await jobService.getJobs()
            response.send(jobs)
        } catch (error) {
            next(error)
        }
    }

    async deleteJob(request, response, next) {
        try {
            const message = await jobService.deleteJob(request.params.jobId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }

    async updateJob(request, response, next) {
        try {
            logger.log('updating job')
            const jobId = request.params.jobId
            const jobData = request.body
            const updatedJob = await jobService.updateJob(jobId, jobData)
            response.send(updatedJob)
        } catch (error) {
            next(error)
        }
    }

    async createJob(request, response, next) {
        try {
            logger.log('creating jobs')
            const job = await jobService.createJob(request.body)
            response.send(job)
        } catch (error) {
            next(error)
        }
    }
}