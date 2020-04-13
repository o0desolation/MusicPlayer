import {CHANGE_THEME} from '../constants/toggleButtonConstant';

export const changeTheme = (theme) => {
    return{
        type:CHANGE_THEME,
        theme
    }
}