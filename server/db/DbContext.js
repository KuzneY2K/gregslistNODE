import mongoose, { mongo } from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { HouseSchema } from '../models/House.js';
import { jobSchema } from '../models/Job.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Homes = mongoose.model('homes', HouseSchema)
  Jobs = mongoose.model('jobs', jobSchema)
}

export const dbContext = new DbContext()
