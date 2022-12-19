import React, { useReducer, useContext } from 'react'
import reducer from './reducer'
import axios from 'axios';
import { 
    DISPLAY_ALERT, 
    CLEAR_ALERT, 
    TOGGLE_SIDEBAR, 
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    LOGOUT_USER,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_ACTIVITY_BEGIN,
    CREATE_ACTIVITY_SUCCESS,
    CREATE_ACTIVITY_ERROR,
    GET_ACTIVITIES_BEGIN,
    GET_ACTIVITIES_SUCCESS,
    SET_EDIT_ACTIVITY,
} from './action'

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');   //เดี๋ยวน่าจะต้องเอาออกนะ

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,  //งง อันนี้
    token: token,
    userLocation: userLocation || '',
    activityLocation: userLocation || '',
    showSidebar:'',
    isEditing: false,
    editActivityId: '',
    Activityname: '',
    ActivityTypeOptions: ['Run', 'Bicycle', 'Hike','Swimming','Walk'],
    ActivityType: 'Run',
    Description:'',
    Date: '',
    Duration: '',
    activities: [],
    totalActivities: 0,
    numOfPages: 1,
    page: 1,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const displayAlert = () => {
        dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({type: CLEAR_ALERT})
        }, 3000)
    }

    const addUserToLocalStorage = ({ user, token, location}) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', token)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('location');
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await axios.post('/api/v1/auth/register', currentUser)
            // console.log(response)
            const { user, token, location } = response.data
            dispatch({ 
                type: REGISTER_USER_SUCCESS, 
                payload: {user, token, location}
            })
            
            addUserToLocalStorage({
                user,
                token,
                location,
            });

        } catch (error) {
            // console.log(error.response)
            dispatch({ 
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }

        clearAlert()
    }

    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN });
        try {
          const { data } = await axios.post('/api/v1/auth/login', currentUser);
          const { user, token, location } = data;
      
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: { user, token, location },
          });
      
          addUserToLocalStorage({ user, token, location });
        } catch (error) {
          dispatch({
            type: LOGIN_USER_ERROR,
            payload: { msg: error.response.data.msg },
          });
        }
        clearAlert();
    };

    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN });
        try {
          const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);
      
          const { user, token, location } = data;
          dispatch({
            type: SETUP_USER_SUCCESS,
            payload: { user, token, location, alertText },
          });
          addUserToLocalStorage({ user, token, location });
        } catch (error) {
          dispatch({
            type: SETUP_USER_ERROR,
            payload: { msg: error.response.data.msg },
          });
        }
        clearAlert();
      };

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    };

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
      }
    
    const handleChange = ({ name, value }) => {
      dispatch({
        type: HANDLE_CHANGE,
        payload: { name, value },
      })
    }

    const clearValues = () => {
      dispatch({ type: CLEAR_VALUES })
    }

    const createActivity = async () => {
      dispatch({ type: CREATE_ACTIVITY_BEGIN });
      try {
        const { Activityname, ActivityType, Description, Date, Duration } = state;
    
        // await authFetch.post('/activities', {
        //   Activityname,                       //ส่งค่าที่ create ไป
        //   ActivityType,
        //   Description,
        //   Date,
        //   Duration,
        // });
        dispatch({
          type: CREATE_ACTIVITY_SUCCESS,        //60 Create แล้ว อย่าลืม clear
        });
        // call function instead clearValues()
        dispatch({ type: CLEAR_VALUES });       //61 clear
      } catch (error) {
        if (error.response.status === 401) return;
        dispatch({
          type: CREATE_ACTIVITY_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
      clearAlert();
    };

    // const getActivities = async () => {
    //   //let url = `/activities`
    
    //   dispatch({ type: GET_ACTIVITIES_BEGIN })
    //   try {
    //     //const { data } = await authFetch(url)
    //     //const { activities, totalActivities, numOfPages } = data
    //     dispatch({
    //       type: GET_ACTIVITIES_SUCCESS,
    //       payload: {
    //         activities,
    //         totalActivities,
    //         numOfPages,
    //       },
    //     })
    //   } catch (error) {
    //     console.log(error.response)
    //     //logoutUser()
    //   }
    //   clearAlert()
    // }

    const setEditActivity = (id) => {
      dispatch({ type: SET_EDIT_ACTIVITY, payload: { id } })
    }
    const editActivity = () => {
      console.log('edit Activity')
    }
    const deleteActivity = (id) =>{
      console.log(`delete : ${id}`)
    }




    return (
        <AppContext.Provider value={{...state, 
        displayAlert, 
        setupUser, 
        registerUser, 
        loginUser, 
        logoutUser, 
        toggleSidebar,
        handleChange,
        clearValues,
        createActivity,
        //getActivities,
        setEditActivity,
        editActivity,
        deleteActivity,
        }}>
            { children }
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }