import {CHANGE_THEME , LIGHT_THEME ,COLORFUL_THEME} from '../constants/toggleButtonConstant';
const initialTheme = LIGHT_THEME;

const toggleButtonReducer = (state = initialTheme, action) => {
    switch(action.type){
        case CHANGE_THEME:{
            if(action.theme === 'light')
                return LIGHT_THEME
            else if (action.theme === 'colorful')
                return COLORFUL_THEME
            break
        }
        default:
            return state;
    }
};

export default toggleButtonReducer;