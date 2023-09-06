import { dbContext } from "../db/DbContext.js";
import { BadRequest } from "../utils/Errors.js";
import { Logger } from "../utils/Logger.js";

class JobService {
    async updateJob(jobId, jobData) {
        const foundJob = await dbContext.Jobs.findById(jobId)
        foundJob.title = jobData.title ? jobData.title : foundJob.title
        foundJob.area = jobData.area ? jobData.area : foundJob.area
        foundJob.description = jobData.description ? jobData.description : foundJob.description
        foundJob.price = jobData.price ? jobData.price : foundJob.price
        await foundJob.save()
        return (`${foundJob.title} removed.`)
    }
    async createJob(jobData) {
        let job = await dbContext.Jobs.create(jobData)
        return job
    }
    async getJobs() {
        let jobs = await dbContext.Jobs.find()
        return jobs
    }

    async deleteJob(jobId) {
        const jobToRemove = await dbContext.Jobs.findById(jobId)
        if (!jobToRemove) {
            throw new BadRequest(`${jobId} not found.`)
        }
        await jobToRemove.remove()
        return jobToRemove
    }

}

export const jobService = new JobService()