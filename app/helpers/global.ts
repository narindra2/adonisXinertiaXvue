
import User from '#models/user';
import { cuid } from '@adonisjs/core/helpers'
export const POST_FILES_URL = 'public/post/images';

export const generateFileNameUsingCuid = (extension : string | undefined) => {
    return cuid() +"." + extension;
};
export const generateFilePath = (path : string , file : string) => {
    return path + "/" + file;
};

export const isEmaiAlreadyExist = async (email : string , exludeUserID : number = 0) => {
    const existAccount = await User.query().where('email', email).where("id" ,"<>"  ,exludeUserID ).first();
    if (existAccount) {
        return true;
    }
    return false;
};

export const sleepServer = async (secondes : number)  => {
    return await new Promise(resolve => setTimeout(resolve, secondes * 1000));
}

