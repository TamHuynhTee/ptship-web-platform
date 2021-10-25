export interface ILoginBody {
    phone: string;
    password: string;
}

export interface IRegisterBody {
    phone: string;
    password: string;
    displayName: string;
}

export interface IUpdateUserBody {
    displayName?: string;
    address?: string;
    phone?: string;
    avatar?: string;
    code?: string;
}

export interface IChangePasswordBody {
    oldPassword: string;
    newPassword: string;
}

export interface IEditStaffBody {
    id?: string;
    displayName?: string;
    address?: string;
    phone?: string;
    avatar?: string;
}
