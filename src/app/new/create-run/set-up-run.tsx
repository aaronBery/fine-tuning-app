'use client'

import { NewJobContext } from "@/context/new-job.context";
import { BaseModel } from "@/models/job.model";
import { Stages } from "@/models/stages.enum";
import { Button, FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";
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

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setCurrentStep(Stages.CONFIGURE);
    }

    return (
        <>
            <h1>Set up your run</h1>
            <form onSubmit={(e) => submit(e)} className="flex flex-column">
                <FormControl>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input id="name" name="name" value={newJob.name} onChange={(e) => updateName(e.target.value)} />
                </FormControl>

                <FormControl>
                    <InputLabel id="baseModel">Select base model</InputLabel>
                    <Select labelId="baseModel" name="baseModel" value={newJob.baseModel} sx={{minWidth: '200px'}}
                        onChange={(e) => updateBaseModel(e.target.value)}>
                        {baseModelOptions.map(option => 
                             <MenuItem key={option.id} value={option.id}>{option.displayName}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <Button type="submit">Next: Configure</Button>
            </form>
        </>
    )
}