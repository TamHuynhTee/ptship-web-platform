import { staffModel } from '../../Models/staff.model';

export interface StaffStateTypes {
    loading?: boolean;
    staff?: staffModel;
    allStaff?: Array<staffModel>;
}
