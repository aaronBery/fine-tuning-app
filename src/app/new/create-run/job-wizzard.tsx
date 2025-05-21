'use client'

import { BaseModel } from "@/models/job.model";
import { NewJobProvider } from "@/context/new-job.context";
import { JobWizzardStepControl } from "./job-wizzard-step-control/job-wizzard-step-control";
import { Card } from "@mui/material";
import { Stages } from "@/models/stages.enum";

interface JobWizzardProps {
    baseModelOptions: BaseModel[];
}

export function JobWizzard({baseModelOptions}: JobWizzardProps) {
    return (
        <NewJobProvider>
            <Card className="mt-5">
                <JobWizzardStepControl baseModelOptions={baseModelOptions} />
            </Card>
        </NewJobProvider>
    );
}