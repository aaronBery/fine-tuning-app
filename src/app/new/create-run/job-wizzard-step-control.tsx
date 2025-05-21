import { NewJobContext } from "@/context/new-job.context";
import { useContext } from "react"
import { SetUpRun } from "./set-up-run";
import { BaseModel } from "@/models/job.model";
import { ConfiguringRun } from "./configuring-run";
import { Review } from "./review";
import { Stages } from "@/models/stages.enum";

interface JobWizzardProps {
    baseModelOptions: BaseModel[];
}

export const JobWizzardStepControl = ({baseModelOptions}: JobWizzardProps) => {
    const { currentStep } = useContext(NewJobContext);

    switch(currentStep) {
        case Stages.SET_UP:
            return (
                <SetUpRun baseModelOptions={baseModelOptions} />
            );
        case Stages.CONFIGURE:
            return (
                <ConfiguringRun />
            );
        case Stages.REVIEW:
            return (<Review baseModelOptions={baseModelOptions} />);
        default:
            return (<p>Ooops something went wrong....</p>);
    }
}