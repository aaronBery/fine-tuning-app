'use client'

import { NewJobContext } from "@/context/new-job.context";
import { BaseModel } from "@/models/job.model";
import { Stages } from "@/models/stages.enum";
import { buttonStyles } from "@/util/styles";
import { Button, FormControl, MenuItem, Select, TextField } from "@mui/material";
import { FormEvent, useContext, useState } from "react";

interface SetUpRunProps {
    baseModelOptions: BaseModel[];
}

export interface setUpFormModel {
    name: string;
    baseModel: string;
}

export function SetUpRun({ baseModelOptions = [] } : SetUpRunProps) {
    const { newJob, updateName, updateBaseModel, setCurrentStep } = useContext(NewJobContext);
    const [ nameTouched, setNameTouched ] = useState(false);
    const [ baseModelTouched, setBaseModelTouched ] = useState(false);

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isNameValid() || !isBaseModelValid()) {
            return;
        }

        setCurrentStep(Stages.CONFIGURE);
    }

    const isNameValid = () => newJob.name.length > 2 && newJob.name.length < 51 && /^[A-Z0-9\-]+$/gi.test(newJob.name);

    const isBaseModelValid = () => newJob.baseModel.length > 0;

    return (
        <>
            <form onSubmit={(e) => submit(e)}>
                <div className="flex flex-col">
                    <FormControl sx={{marginBottom: 5}}>
                        <TextField id="name" name="name" value={newJob.name} onChange={(e) => updateName(e.target.value)}
                        sx={{maxWidth: '50%'}}
                        error={nameTouched && !isNameValid()}
                        onFocus={() => setNameTouched(true)}
                        label="Name your job"
                        helperText="3-50 alpha numeric characters along with dashes are permitted." />
                    </FormControl>

                    <FormControl>
                        <Select name="baseModel" value={newJob.baseModel} sx={{maxWidth: '50%'}}
                            displayEmpty
                            error={baseModelTouched && !isBaseModelValid()}
                            onFocus={() => setBaseModelTouched(true)}
                            onChange={(e) => updateBaseModel(e.target.value)}>
                            <MenuItem disabled value="">
                                Select base model
                            </MenuItem>
                            {baseModelOptions.map(option => 
                                <MenuItem key={option.id} value={option.id}>{option.displayName}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>

                <Button type="submit" disabled={!isNameValid() || !isBaseModelValid()} sx={{
                    ...buttonStyles,
                    marginTop: 2,
                }}>Next: Configure</Button>
            
            </form>
        </>
    )
}