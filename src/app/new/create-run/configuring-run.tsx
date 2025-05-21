import { NewJobContext } from "@/context/new-job.context";
import { Stages } from "@/models/stages.enum";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { FormEvent, useContext } from "react";

export const ConfiguringRun = () => {
    const { newJob, setCurrentStep, updateEpochs, updateWarmupEpochs, updateEvaluationEpochs, updateLearningRate } = useContext(NewJobContext);

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setCurrentStep(Stages.REVIEW);
    };

    const formControlSx = { marginBottom: 5};

    return (
        <>
            <h1>Configure your run</h1>
            <p className="mb-5">Adjust these parameters to control how your model learns, balances performance, and prevents overfitting during fine-tuning. See the docs for guidance on settingn these parameters for optimal fine-tuning.</p>
            
            <form onSubmit={(e) => submit(e)} className="grid grid-cols-2">
                <div className="grid grid-cols-1">
                    <FormControl sx={formControlSx}>
                        <InputLabel htmlFor="ephochs">Epochs</InputLabel>
                        <Input id="ephochs" type="number" name="ephochs" value={newJob.epochs} onChange={(e) => updateEpochs(e.target.value)} />
                    </FormControl>

                    <FormControl sx={formControlSx}>
                        <InputLabel htmlFor="warmupEpochs">Warmup Epochs</InputLabel>
                        <Input id="warmupEpochs" type="number" name="warmupEpochs" value={newJob.warmupEpochs} onChange={(e) => updateWarmupEpochs(e.target.value)} />
                    </FormControl>
                </div>
                <div className="grid grid-cols-1">
                    <FormControl sx={formControlSx}>
                        <InputLabel htmlFor="evaluationEpochs">Evaluation Epochs</InputLabel>
                        <Input id="evaluationEpochs" type="number" name="evaluationEpochs" value={newJob.evaluationEpochs} onChange={(e) => updateEvaluationEpochs(e.target.value)} />
                    </FormControl>

                    <FormControl sx={formControlSx}>
                        <InputLabel htmlFor="learningRate">Learning rate</InputLabel>
                        <Input id="learningRate" name="learningRate" value={newJob.learningRate} onChange={(e) => updateLearningRate(e.target.value)} />
                    </FormControl>
                </div>
                <Button type="submit">Next: Review</Button>
            </form>
        </>
    );
}