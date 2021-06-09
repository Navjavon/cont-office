interface ISuggestion {
    id?: number;
    description: string
    group: IIdName;
    author: IAuthor;
    creator: IIdName;
    date: number;
    comments?: string;
}

interface ISuggestionDB extends
    Pick<ISuggestion, 'id' | 'description' | 'date' | 'comments'>,
    Omit<IAuthor, 'id'>,
    Pick<IComplaintDB, 'group' | 'groupId' | 'creatorName' | 'creatorId'> {
    authorId: number;
}

type ISuggestionReport = IComplaintShortReport;
