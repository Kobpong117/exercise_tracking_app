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
      type: String,
      required: true,
    },
    Date: {
        type: String,
        required: true,
      },
    createdBy: {
      type: mongoose.Types.ObjectId,   //อยากเห็นว่าหน้าตาเป็นไง
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  }
);

export default mongoose.model('Activity', ActivitySchema);