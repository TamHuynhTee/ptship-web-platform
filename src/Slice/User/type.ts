import { currentUserModel } from '../../Models/auth.model';

export interface UserStateTypes {
    loading?: boolean;
    user?: currentUserModel;
    allUser?: Array<currentUserModel>;
}
