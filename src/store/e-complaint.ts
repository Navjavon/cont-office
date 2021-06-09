export const EComplaint: IComplaint = {
    description: '',
    creationDate: (new Date()).valueOf(),
    number: null,
    group: {
        id: 0
    },
    region: {
        id: 0
    },
    status: {
        id: 1
    },
    creator: {
        id: 0
    },
    complainer: {
        name: '',
        gender: 0
    },
    execution: {
        resDepartment: {
            id: 0
        },
        date: 0
    }
};

export const EComplaintDeleted: IComplaintDeleted = Object.assign(EComplaint, {
    remover: {
        id: 0
    },
    remReason: {
        id: 0,
        name: ''
    },
    remReasonDesc: '',
    removeDate: 0
});
