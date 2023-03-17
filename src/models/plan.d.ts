export type PlanType={
    id: number;
    tagId?:number;
    planTitle: string;
    description?: string;
    status: number;
    priority?: number;
    userId: number;
    tagName?: string;
    createTime: Date;
}
