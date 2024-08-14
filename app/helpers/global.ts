
import { cuid } from '@adonisjs/core/helpers'

export const generateFileNameUsingCuid = (extension : string | undefined) => {
    return cuid() +"." + extension;
};
export const generateFilePath = (path : string , image : string) => {
    return path + "/" + image;
};

export const POST_FILES_URL = 'public/post/images';
