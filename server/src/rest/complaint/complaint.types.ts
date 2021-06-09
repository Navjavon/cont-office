interface IExecution {
    id?: number;
    resDepartment: IDepartment;
    date: number;
    canalComments?: string;
    otherComments?: string;
}

interface IAuthor extends IIdName {
    surname?: string;
    patronymic?: string;
    gender?: number;
    phone?: string;
    street?: string;
    home?: string;
    room?: string;
}

type IAuthorShort = Pick<IAuthor, 'id' | 'name' | 'surname'>;

interface IComplaint {
    id?: number;
    number: number;
    description: string;
    group: IIdName;
    complainer: IAuthor;
    execution: IExecution;
    creator: IAuthorShort;
    region: IIdName;
    creationDate: number;
    status: IIdName;
}

interface IComplaintDB extends
    Pick<IComplaint, 'id' | 'number' | 'description' | 'creationDate'>,
    Omit<IAuthor, 'id'>,
    Omit<IExecution, 'id' | 'date' | 'resDepartment'> {
    executionDate: number;
    resDepartment: string;
    resDepartmentChief: string;
    resDepartmentId: number;
    group: string;
    groupId: number;
    complainerId: number,
    executionId: number;
    creatorName: string;
    creatorLastName: string;
    creatorId: number;
    region: string;
    regionId: number;
    status: string;
    statusId: number;
}

interface IComplaintDeleted extends IComplaint {
    remover: IAuthorShort;
    remReason: IIdName;
    remReasonDesc?: string;
    removeDate: number;
}

interface IComplaintDeletedDB extends
    IComplaintDB, Pick<IComplaintDeleted, 'remReasonDesc' | 'removeDate'> {
    removerName: string;
    removerLastName: string;
    remReasonId: number;
    remReason: string;
}

interface IComplaintDelete extends Pick<IComplaintDeletedDB, 'id' | 'remReasonId' | 'remReasonDesc'> {
    removerId?: number;
}

interface IComplaintShortReport extends
    Pick<IComplaintDB, 'groupId'>,
    ICount {}

interface IComplaintFullReport extends
    IComplaintShortReport,
    Pick<IComplaintDB, 'statusId'>,
    ICount {}

interface INewNumber {
    newNumber: number;
}
