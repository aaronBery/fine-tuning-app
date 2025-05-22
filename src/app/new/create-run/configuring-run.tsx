import { NewJobContext } from "@/context/new-job.context";
import { Stages } from "@/models/stages.enum";
import { buttonStyles } from "@/util/styles";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { FormEvent, useContext, useState } from "react";

export const ConfiguringRun = () => {
    const { newJob, setCurrentStep, updateEpochs, updateWarmupEpochs, updateEvaluationEpochs, updateLearningRate } = useContext(NewJobContext);
    const [ epochTouched, setEpochTouched ] = useState(false);
    const [ warmupEpochsTouched, setWarmupEpochsTouched ] = useState(false);
    const [ evaluationEpochsTouched, setEvaluationEpochsTouched ] = useState(false);
    const [ learningRateTouched, setLearningRateTouched ] = useState(false);


    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setCurrentStep(Stages.REVIEW);
    };

    const formControlSx = { marginBottom: 5};

    const isValidEpoch = () => newJob.epochs > 0;

    const isValidEvaluationAndWarmupEpochs = () => (newJob.evaluationEpochs + newJob.warmupEpochs) <= newJob.epochs;

    const isValidLearningRate = () => parseInt(newJob.learningRate, 10) >= 0 && parseInt(newJob.learningRate, 10) <= 1;

    return (
        <>  
            <form onSubmit={(e) => submit(e)} className="grid grid-cols-2 gap-5">
                <div className="grid grid-cols-1">
                    <FormControl sx={formControlSx}>
                        <InputLabel htmlFor="ephochs">Epochs</InputLabel>
                        <Input id="ephochs" type="number" name="ephochs" value={newJob.epochs} onChange={(e) => updateEpochs(e.target.value)}
                            error={epochTouched && !isValidEpoch()}
                            onFocus={() => setEpochTouched(true)} />
                    </FormControl>

                    <FormControl sx={formControlSx}>
                        <InputLabel htmlFor="warmupEpochs">Warmup Epochs</InputLabel>
                        <Input id="warmupEpochs" type="number" name="warmupEpochs" value={newJob.warmupEpochs} onChange={(e) => updateWarmupEpochs(e.target.value)}
                            error={warmupEpochsTouched && !isValidEvaluationAndWarmupEpochs()}
                            onFocus={() => setWarmupEpochsTouched(true)} />
                    </FormControl>
                </div>
                <div className="grid grid-cols-1">
                    <FormControl sx={formControlSx}>
                        <InputLabel htmlFor="evaluationEpochs">Evaluation Epochs</InputLabel>
                        <Input id="evaluationEpochs" type="number" name="evaluationEpochs" value={newJob.evaluationEpochs} onChange={(e) => updateEvaluationEpochs(e.target.value)}
                            error={evaluationEpochsTouched && !isValidEvaluationAndWarmupEpochs()}
                            onFocus={() => setEvaluationEpochsTouched(true)} />
                    </FormControl>

                    <FormControl sx={formControlSx}>
                        <InputLabel htmlFor="learningRate">Learning rate</InputLabel>
                        <Input id="learningRate" name="learningRate" value={newJob.learningRate} onChange={(e) => updateLearningRate(e.target.value)} 
                            error={learningRateTouched && !isValidLearningRate()}
                            onFocus={() => setLearningRateTouched(true)} />
                    </FormControl>
                </div>

                <Button type="submit" 
                    disabled={!isValidEpoch() || !isValidEvaluationAndWarmupEpochs() || !isValidLearningRate()} sx={{
                        ...buttonStyles,
                        marginBottom: 2,
                    }}>
                    Next: Review
                </Button>
            </form>

            <p className={`${!isValidEvaluationAndWarmupEpochs() && (epochTouched || evaluationEpochsTouched || warmupEpochsTouched) ? 'visible' : 'hidden'} flex flex-row text-red-500`}>
                Total number of warm up epochs and evaluation epochs must equal the total number of epochs
            </p>

        </>
    );
}