
import { cuid } from '@adonisjs/core/helpers'

export const generateImageNameUsingCuid = (extension : string | undefined) => {
    return cuid() +"." + extension;
};
export const generateImagNameWithPath = (path : string , image : string) => {
    return path + "/" + image;
};

export const POST_IMAGE_URL = 'public/post/images';
