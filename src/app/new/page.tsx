import { BaseModel } from "@/models/job.model";
import { JobWizzard } from "./create-run/job-wizzard";

export default async function NewJob() {
  const apiUrl = process.env.API_URL ?? '';
  const apiKey = process.env.API_KEY ?? '';
  const baseModelsReq = await fetch(`${apiUrl}/models`, {
    headers: {
     'X-API-Key':apiKey
    }
  });

  const baseModelOptions: BaseModel[] = await baseModelsReq.json();


  return (
    <JobWizzard baseModelOptions={baseModelOptions}  />
  );
}
