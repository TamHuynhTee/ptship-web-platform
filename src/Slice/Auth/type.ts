import { currentUserModel } from '../../Models/auth.model';

export interface AuthStateTypes {
    loading?: boolean;
    currentUser?: currentUserModel;
}
