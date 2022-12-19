import Activity from '../models/Activity.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';



const createActivity = async (req, res) => {
    const { Activityname, ActivityType, Duration, Date } = req.body;
  
    if (!Activityname || !ActivityType || !Duration || !Date ) {
      throw new BadRequestError('Please Provide All Values');
    }
  
    req.body.createdBy = req.user.userId;  //65 มาไงนะ
  
    const activity = await Activity.create(req.body);
    res.status(StatusCodes.CREATED).json({ activity });
  };

const updateActivity = async(req,res) => {  //20
    const { id: activityId } = req.params;

    const { Activityname, ActivityType, Duration, Date } = req.body;
  
    if (!Activityname || !ActivityType || !Duration || !Date) {
      throw new BadRequestError('Please Provide All Values');
    }
  
    const activity = await Activity.findOne({ _id: activityId });
  
    if (!activity) {
      throw new NotFoundError(`No activity with id ${activityId}`);
    }

    // check permissions
    const updatedActivity = await Activity.findOneAndUpdate({ _id: activityId }, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(StatusCodes.OK).json({ updatedActivity })
    }

    const deleteActivity = async (req, res) => {
        const { id: activityId } = req.params;
      
        const activity = await Activity.findOne({ _id: activityId });
      
        if (!activity) {
          throw new NotFoundError(`No activity with id : ${activityId}`);
        }
      
        //checkPermissions(req.user, activity.createdBy);
      
        await activity.remove();
        res.status(StatusCodes.OK).json({ msg: 'Success! Activity removed' });
      };


const getAllActivities = async (req, res) => {
  const activities = await Activity.find({ createdBy: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ activities, totalActivities: activities.length, numOfPages: 1 });
};



const showStats = async(req,res) => {  //20
    res.send('show stats')
}



export { createActivity, deleteActivity, getAllActivities, updateActivity, showStats };  //20