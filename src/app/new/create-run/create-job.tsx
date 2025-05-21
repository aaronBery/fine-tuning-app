
'use server'

import { NewJobPostModel } from "./review";

const apiUrl = process.env.API_URL ?? '';
const apiKey = process.env.API_KEY ?? '';

export async function createJob(job: NewJobPostModel) {
    const response = await fetch(`${apiUrl}/jobs`, {
        method: 'POST',
        body: JSON.stringify(job),
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
        }
    });
    
    const { status, statusText } = response;
    return {
        status,
        statusText
    }
}