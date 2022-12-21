import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema(
  
    {
    Activityname: {
      type: String,
      required: [true, 'Please provide activity name'],
      maxlength: 50,
    },
    ActivityType: {
      type: String,
      required: true,
      enum: ['Run', 'Bicycle', 'Hike','Swimming','Walk'],
      default: 'Run',
    },
    Description: {
      type: String,
      maxlength: 100
    },
    Duration: {
      type: Number,
      required: true,
    },
    Date: {
        type: Date,
        required: true,
      },
    createdBy: {                       //สร้างเอาไว้เพื่อรอรับค่าจากฝั่ง User ว่าใครเป็นคนสร้างจ็อบนี้อีกที
      type: mongoose.Types.ObjectId,   //อยากเห็นว่าหน้าตาเป็นไง
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  }
);

export default mongoose.model('Activity', ActivitySchema);