import merge from 'deepmerge';
// @ts-ignore
export const EComplaint: IComplaint = {
    description: '',
    number: 0,
    group: {
        id: 0
    },
    region: {
        id: 0
    },
    status: {
        id: 0
    },
    complainer: {
        name: '',
        surname: '',
        street: '',
        home: '',
        phone: '',
        gender: 0
    },
    execution: {
        resDepartment: {
            id: 0
        },
        date: 0,
        canalComments: ''
    }
};

export const EComplaintUpdate = merge(EComplaint, {
    complainer: {
        id: 0
    },
    execution: {
        id: 0
    }
});

export const EComplaintDelete: IComplaintDelete = {
    remReasonId: 0,
    id: 0
};
