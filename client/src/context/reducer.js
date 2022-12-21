import { 
    DISPLAY_ALERT, 
    CLEAR_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR, 
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_ACTIVITY_BEGIN,
    CREATE_ACTIVITY_SUCCESS,
    CREATE_ACTIVITY_ERROR,
    GET_ACTIVITIES_BEGIN,
    GET_ACTIVITIES_SUCCESS,
    SET_EDIT_ACTIVITY,
    DELETE_ACTIVITY_BEGIN,
    DELETE_ACTIVITY_SUCCESS,
    DELETE_ACTIVITY_ERROR

} from "./action"

import { initialState } from './appContext'

const reducer = (state, action) => {

    if (action.type === DISPLAY_ALERT) {
        return {
            ...state, 
            showAlert: true, 
            alertType: 'danger', 
            alertText: 'Please provide all values!' 
        }
        console.log('DISPLAY_ALERT is fired')
    }

    if (action.type === CLEAR_ALERT) {
        return {
            ...state, 
            showAlert: false, 
            alertType: '', 
            alertText: '' 
        }
    }

    // if (action.type === REGISTER_USER_BEGIN) {
    //     return { ...state, isLoading: true}
    // }

    // if (action.type === REGISTER_USER_SUCCESS) {
    //     return { 
    //         ...state, 
    //         isLoading: false,
    //         token: action.payload.token,
    //         user: action.payload.user,
    //         userLocation: action.payload.location,
    //         activityLocation: action.payload.location,
    //         showAlert: true, 
    //         alertType: 'success', 
    //         alertText: 'User Created Successfully!' 
    //     }
    // }

    // if (action.type === REGISTER_USER_ERROR) {
    //     return { 
    //         ...state, 
    //         isLoading: false,
    //         showAlert: true, 
    //         alertType: 'danger', 
    //         alertText: action.payload.msg 
    //     }
    // }

    // if (action.type === LOGIN_USER_BEGIN) {
    //     return { ...state, isLoading: true}
    // }

    // if (action.type === LOGIN_USER_SUCCESS) {
    //     return { 
    //         ...state, 
    //         isLoading: false,
    //         token: action.payload.token,
    //         user: action.payload.user,
    //         userLocation: action.payload.location,
    //         activityLocation: action.payload.location,
    //         showAlert: true, 
    //         alertType: 'success', 
    //         alertText: 'Login Successful!' 
    //     }
    // }

    // if (action.type === LOGIN_USER_ERROR) {
    //     return { 
    //         ...state, 
    //         isLoading: false,
    //         showAlert: true, 
    //         alertType: 'danger', 
    //         alertText: action.payload.msg 
    //     }
    // }

    if (action.type === SETUP_USER_BEGIN) {
        return { ...state, isLoading: true };
      }

    if (action.type === SETUP_USER_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          token: action.payload.token,
          user: action.payload.user,
          userLocation: action.payload.location,
          jobLocation: action.payload.location,
          showAlert: true,
          alertType: 'success',
          alertText: action.payload.alertText,
        };
    }

    if (action.type === SETUP_USER_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        };
    }

    if (action.type === TOGGLE_SIDEBAR) {
        return {
          ...state,
          showSidebar: !state.showSidebar,
        };
    }

    
      if (action.type === LOGOUT_USER) {
        return { 
            ...initialState, 
            user: null,
            token: null,
            userLocation: '',
            activityLocation: '',
        }
    }

    if (action.type === HANDLE_CHANGE) {
        return { ...state, [action.payload.name]: action.payload.value }; //งง ทำไมต้องเป็น array
      }
  
      if (action.type === CLEAR_VALUES) {
        const initialState = {
          isEditing: false,
          editActivityId: '',
          Activityname: '',
          ActivityType: 'Run',
          Description:'',
          Date:'',
          Duration:'',
        };
        return { ...state, ...initialState };
      }
  
      if (action.type === CREATE_ACTIVITY_BEGIN) {
        return { ...state, isLoading: true };
      }
      if (action.type === CREATE_ACTIVITY_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'success',
          alertText: 'New ACTIVITY Created!',
        };
      }
      if (action.type === CREATE_ACTIVITY_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        };
      }
  
      if (action.type === GET_ACTIVITIES_BEGIN) {
        return { ...state, isLoading: true, showAlert: false };
      }
      if (action.type === GET_ACTIVITIES_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          activities: action.payload.activities,
          totalActivities: action.payload.totalActivities,
          numOfPages: action.payload.numOfPages,
        };
      }
  
      if (action.type === SET_EDIT_ACTIVITY) {
        const activity = state.activities.find((activity) => activity._id === action.payload.id);
        const { _id, Activityname, ActivityType, Description, Duration, Date } = activity;
        return {
          ...state,
          isEditing: true,
          editActivityId: _id,
          Activityname,
          ActivityType,
          Description,
          Duration,
          Date,
        };
      }

      if (action.type === DELETE_ACTIVITY_BEGIN) {
        return { ...state, isLoading: true };
      }

    throw new Error(`no such action: ${action.type}`)
}

export default reducer