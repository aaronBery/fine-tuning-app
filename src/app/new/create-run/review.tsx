'use client'

import { NewJobContext, NewJobContextModel } from "@/context/new-job.context"
import { BaseModel } from "@/models/job.model";
import { Button } from "@mui/material";
import { FormEvent, useContext, useState } from "react"
import { createJob } from "./create-job";

interface ReviewProps {
    baseModelOptions: BaseModel[];
}

export interface NewJobPostModel {
    name: string;
    baseModel: string;
    epochs: number,
    evaluationEpochs: number,
    warmupEpochs: number,
    learningRate: number,
}

export const Review = ({ baseModelOptions }: ReviewProps) => {
    const { newJob } = useContext(NewJobContext);
    const [ errorMsg, setErrorMsg ] = useState('');

    const getModelNameFromId = (id: string) => baseModelOptions.find(model => model.id === newJob.baseModel)?.displayName;

    const getBodyFromJobData = (job: NewJobContextModel): NewJobPostModel => {
        const { name, baseModel, epochs, evaluationEpochs, warmupEpochs} = job;

        return {
            name,
            baseModel,
            epochs,
            evaluationEpochs,
            warmupEpochs,
            learningRate: parseInt(job.learningRate, 10)
        }
    }

    const submit = async(e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const response = await createJob(getBodyFromJobData(newJob));

        if(response.status !== 200) {
            setErrorMsg(response.statusText);
        }
    }

    return (
        <>
            <p>{newJob.name}</p>

            <p>{getModelNameFromId(newJob.baseModel)}</p>

            <p>Configuration</p>
            <p>Epochs: {newJob.epochs} Eval Epochs: {newJob.evaluationEpochs} Warmup Epochs: {newJob.warmupEpochs} Learning rate: {newJob.learningRate}</p>

            <Button type="button" onClick={e => submit(e)}>Start fine-tuning</Button>

            {errorMsg && <p>{errorMsg}</p> }
        </>
    );
}