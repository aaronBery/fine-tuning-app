'use client'

import { NewJobContext, NewJobContextModel } from "@/context/new-job.context"
import { BaseModel } from "@/models/job.model";
import { Button } from "@mui/material";
import { FormEvent, useContext, useState } from "react"
import { createJob } from "./create-job";
import { buttonStyles } from "@/util/styles";
import { OverViewCard } from "@/components/overview-card";
import { Architecture, Chat, Handyman, Tune } from "@mui/icons-material";

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

    const getModelNameFromId = () => baseModelOptions.find(model => model.id === newJob.baseModel)?.displayName;

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
            <div className="mt-5 mb-5">
                <OverViewCard title={newJob.name}>
                    <Handyman sx={{
                        height: 'auto',
                        width: '40px'
                    }} />
                </OverViewCard>
            </div>

            <div className="mb-5">
                <OverViewCard title="Model" strapline={getModelNameFromId()}>
                    <Architecture sx={{
                        height: 'auto',
                        width: '40px'
                    }} />
                </OverViewCard>
            </div>

            <div className="mb-5">
                <OverViewCard title="Configuration" strapline={`Epochs: ${newJob.epochs} Eval Epochs: ${newJob.evaluationEpochs} Warmup Epochs: ${newJob.warmupEpochs} Learning rate: ${newJob.learningRate}`}>
                    <Tune sx={{
                        height: 'auto',
                        width: '40px'
                    }} />
                </OverViewCard>
            </div>

            <Button type="button" onClick={e => submit(e)} sx={{
                ...buttonStyles,
                marginTop: 2,
            }}>Start fine-tuning</Button>

            {errorMsg && <p>{errorMsg}</p> }
        </>
    );
}