import Activity from '../models/Activity.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';



const createActivity = async (req, res) => {
    const { Activityname, ActivityType, Duration, Date } = req.body; //ดึงค่าที่Required ออกมา เพื่อเช็คว่าป้อนครบมั้ย
  
    if (!Activityname || !ActivityType || !Duration || !Date ) { //เช็ค
      throw new BadRequestError('Please Provide All Values');
    }
    req.body.createdBy = req.user.userId;  //65 มาไงนะ
  
    const activity = await Activity.create(req.body); //สร้าง Activity 
    res.status(StatusCodes.CREATED).json({ activity });
  };

const updateActivity = async(req,res) => {  //20
    const { id: activityId } = req.params;

    const { Activityname, ActivityType, Duration, Date } = req.body;
  
    if (!Activityname || !ActivityType || !Duration || !Date) {
      throw new BadRequestError('Please Provide All Values');
    }
  
    const activity = await Activity.findOne({ _id: activityId }); //ส่ง activityId ไปหาใน database
  
    if (!activity) {
      throw new NotFoundError(`No activity with id ${activityId}`);
    }

    checkPermissions(req.user, activity.createdBy);
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
  
    checkPermissions(req.user, activity.createdBy);
  
    await activity.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! Activity removed' });
  };


const getAllActivities = async (req, res) => {
  const activities = await Activity.find({ createdBy: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ activities, totalActivities: activities.length, numOfPages: 1 }); //num of pages ในทีนี้ หมายถึงอะไร
};



const showStats = async(req,res) => {  //20
    res.send('show stats')
}



export { createActivity, deleteActivity, getAllActivities, updateActivity, showStats };  //20