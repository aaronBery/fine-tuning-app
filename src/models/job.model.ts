export interface Job {
    id: string;
    name: string;
    baseModel: string;
    epochs: number;
    evaluationEpochs: number;
    warmupEpochs: number;
    learningRate: number;
    date: string;
    createdAt: string;
    status: string;
}

export interface Jobs {
    jobs: Job[],
    summary: {
        completed: number;
        running: number;
        failed: number;
    }
}

export interface BaseModel {
    id: string;
    displayName: string;
}