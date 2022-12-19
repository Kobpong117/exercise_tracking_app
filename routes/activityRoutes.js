import express from 'express'
const router = express.Router()

import { createActivity, getAllActivity, updateActivity, deleteActivity, showStats } from '../controllers/activityController.js'

router.route('/').post(createActivity).get(getAllActivity)
// remember about id
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteActivity).patch(updateActivity)

export default router