import { setUpFormModel } from "@/app/new/create-run/set-up-run";
import { Stages } from "@/models/stages.enum";
import { PropsWithChildren, useState, createContext } from "react";

export interface NewJobContextModel {
    name: string;
    baseModel: string;
    epochs: number,
    evaluationEpochs: number,
    warmupEpochs: number,
    learningRate: string,
    date: string;
    createdAt: string;
    status: string;
}

export const NewJobContext = createContext<{
    newJob: NewJobContextModel,
    updateName: (name: string) => void,
    updateBaseModel: (baseModel: string) => void,
    updateEpochs: (epoch: string) => void,
    updateWarmupEpochs: (warmupEpochs: string) => void,
    updateEvaluationEpochs: (evaluationEpochs: string) => void,
    updateLearningRate: (learningRate: string) => void,
    currentStep: number,
    stepCount: number,
    setCurrentStep: (step: number) => void,
}>({} as any);

export const NewJobProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [ newJob, setNewJob ] = useState<NewJobContextModel>({
        name: '',
        baseModel: '',
        epochs: 0,
        evaluationEpochs: 0,
        warmupEpochs: 0,
        learningRate: '',
        date: '',
        createdAt: '',
        status: '',
    });

    // register steps so we know how many there are
    const [ stepCount ] = useState([Stages.SET_UP, Stages.CONFIGURE, Stages.REVIEW].length);

    const [ currentStep, setCurrentStep ] = useState(Stages.SET_UP);

    const updateName = (name: string) => {
        const updatedNewJob = {
            ...newJob,
            name,
        }
        setNewJob(updatedNewJob);
    };

    const updateBaseModel = (baseModel: string) => {
        const updatedNewJob = {
            ...newJob,
            baseModel
        }
        setNewJob(updatedNewJob);
    };

    const updateEpochs = (epoch: string) => {
        const updatedNewJob = {
            ...newJob,
            epochs: parseInt(epoch, 10),
        }
        setNewJob(updatedNewJob);
    };

    const updateWarmupEpochs = (warmupEpochs: string) => {
        const updatedNewJob = {
            ...newJob,
            warmupEpochs: parseInt(warmupEpochs, 10),
        }
        setNewJob(updatedNewJob);
    };

    const updateEvaluationEpochs = (evaluationEpochs: string) => {
        const updatedNewJob = {
            ...newJob,
            evaluationEpochs: parseInt(evaluationEpochs, 10),
        }
        setNewJob(updatedNewJob);
    };

    const updateLearningRate = (learningRate: string) => {
        const updatedNewJob = {
            ...newJob,
            learningRate: learningRate
        }
        setNewJob(updatedNewJob);
    };

    return (
        <NewJobContext.Provider value={{
            newJob,
            updateName,
            updateBaseModel,
            updateEpochs,
            updateWarmupEpochs,
            updateEvaluationEpochs,
            updateLearningRate,
            currentStep,
            stepCount,
            setCurrentStep
        }}>{children}</NewJobContext.Provider>
    )
}