import moment from 'moment';

import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Job';
import ActivityInfo from './JobInfo';

const Activity = ({
  _id,
  Activityname,
  ActivityType,
  Description,
  Duration,
  createdAt,
  Date,
}) => {
  const { setEditActivity, deleteActivity } = useAppContext();

  let date = moment(createdAt);
  date = date.format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{ActivityType.charAt(0)}</div>
        <div className='info'>
          <h5>{Activityname}</h5>
          <p>{ActivityType}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <ActivityInfo icon={<FaLocationArrow />} text={Activityname} />
          <ActivityInfo icon={<FaCalendarAlt />} text={date} />
          <ActivityInfo icon={<FaBriefcase />} text={ActivityType} />
        </div>

        {/* content center later */}
        <footer>
          <div className='actions'>
            <Link
              to='/add-activity'
              onClick={() => setEditActivity(_id)}
              className='btn edit-btn'
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteActivity(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Activity;