import { NewJobContext } from "@/context/new-job.context";
import { useContext } from "react"
import { SetUpRun } from "../set-up-run";
import { BaseModel } from "@/models/job.model";
import { ConfiguringRun } from "../configuring-run";
import { Review } from "../review";
import { Stages } from "@/models/stages.enum";
import styles from './styles.module.css';

interface JobWizzardProps {
    baseModelOptions: BaseModel[];
}

export const JobWizzardStepControl = ({baseModelOptions}: JobWizzardProps) => {
    const { currentStep, stepCount } = useContext(NewJobContext);

    const getWizzardStep = () => {
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

    const getTitleFromStep = () => {
        switch(currentStep) {
            case Stages.SET_UP:
                return 'Set up your run';
            case Stages.CONFIGURE:
                    return 'Configure your run';
            case Stages.REVIEW:
                return 'Review your job';
            default:
                return '';
        }
    }

    const getDescriptionFromStep = () => {
        switch(currentStep) {
            case Stages.CONFIGURE:
                return 'Adjust these parameters to control how your model learns, balances performance, and prevents overfitting during fine-tuning. See the docs for guidance on settingn these parameters for optimal fine-tuning'
            default:
                return '';
        }
    }
    
    return (
        <div className="p-5">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col pr-5">
                    <p className="text-lg font-bold">{getTitleFromStep()}</p>
                    <p className="mb-5 text-gray-500">{getDescriptionFromStep()}</p>
                </div>
                <p className={`${styles.stepCount} bg-gray-50 p-1 justify-self-end min-w-[100px]`}><span className="font-bold">{currentStep + 1}</span> of <span className="text-gray-500">{stepCount}</span></p>
            </div>
            
            {getWizzardStep()}
        </div>
    );

}