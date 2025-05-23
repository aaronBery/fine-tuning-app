import { Jobs } from "@/models/job.model";
import { Button, Card, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Link from "next/link";
import { Suspense } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import HandymanIcon from '@mui/icons-material/Handyman';
import { buttonStyles } from "@/util/styles";

export default async function Home() {
  const apiUrl = process.env.API_URL ?? '';
  const apiKey = process.env.API_KEY ?? '';
  const jobsReq = await fetch(`${apiUrl}/jobs`, {
    headers: {
     'X-API-Key':apiKey
    }
  });

  const jobsListing: Jobs = await jobsReq.json();

  const getChipColour = (status: string) => {
    switch(status) {
      case 'Running':
        return 'primary'
      case 'Completed':
        return 'success';
      case 'Failed':
        return 'error'
      default:
        return 'default';
    }
  }

  const getJobPluralisation = (count: number) => count === 1 ? 'job' : 'jobs'; 

  return (
    <div className="grid grid-cols-2 gap-5 mt-5">
      <div className="col-span-1">
        <Card sx={{ padding: 3}}>
          <h2 className="mb-5 text-lg font-bold">Fine-tuning usage</h2>
          <Suspense>
            <Card sx={{ padding: 5, marginBottom: 5}}>
                <PieChart series={[
                  { data: [
                      { id: 0, value: jobsListing.summary.completed, label: `Completed: ${jobsListing.summary.completed} ${getJobPluralisation(jobsListing.summary.completed)}`},
                      { id: 1, value: jobsListing.summary.running, label: `Running: ${jobsListing.summary.running} ${getJobPluralisation(jobsListing.summary.running)}`},
                      { id: 2, value: jobsListing.summary.failed, label: `Failed ${jobsListing.summary.failed} ${getJobPluralisation(jobsListing.summary.failed)}`}
                    ]
                  }
                ]} />
            </Card>

            <TableContainer>
              <Table>
                <TableHead className="bg-gray-50">
                  <TableRow>
                    <TableCell>Job ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobsListing.jobs.map((row) => (
                    <TableRow
                      key={row.id}
                    >
                      <TableCell>{row.id.slice(0, 23)}</TableCell>
                      <TableCell>{new Date(row.date).toLocaleString()}</TableCell>
                      <TableCell align="right"><Chip label={row.status} color={getChipColour(row.status)} /></TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Suspense>
        </Card>
      </div>
      <div className="col-span-1">
        <Card sx={{ padding: 3}}>
          <h2 className="mb-5 text-lg font-bold">Get Started</h2>

          <Card sx={{ padding: 5}}>
            <div className="grid grid-cols-4">
              <div className="col-span-1 grid content-center justify-center bg-gray-50 p-5">
                <HandymanIcon sx={{
                  height: 'auto',
                  width: '100%'
                }}/>
              </div>
              <div className="col-span-3 p-5">
                <h3 className="mb-5 text-lg font-bold">Get started with Fine-tuning</h3>
                <p className="mb-5">Simple, ready-to-use interface endpoints that are paid for per request. No commitments, only pay for what you use with Nscale Serverless.</p>
                      
                <Link href="/new"><Button sx={buttonStyles}>New Fine-tuning Job</Button></Link>
              </div>
            </div>
          </Card>
        </Card>
      </div>
    </div>
  );
}
