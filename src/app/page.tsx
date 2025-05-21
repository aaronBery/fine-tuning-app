import { Jobs } from "@/models/job.model";
import { Card, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Link from "next/link";
import { Suspense } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import HandymanIcon from '@mui/icons-material/Handyman';

function createData(
  id: string,
  date: string,
  status: string,
) {
  return { id, date, status };
}

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

  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1">
        <Card sx={{ padding: 5}}>
          <h2 className="">Fine-tuning usage</h2>
          <Suspense>
            <Card sx={{ padding: 5}}>
                <PieChart series={[
                  { data: [
                      { id: 0, value: jobsListing.summary.completed, label: 'Completed'},
                      { id: 1, value: jobsListing.summary.running, label: 'Running'},
                      { id: 2, value: jobsListing.summary.failed, label: 'Failed'}
                    ]
                  }
                ]} />
            </Card>

            <TableContainer>
              <Table>
                <TableHead>
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
        <Card sx={{ padding: 5}}>
          <h2>Get Started</h2>

          <Card sx={{ padding: 5}}>
            <h3 className="h">Get started with Fine-tuning</h3>
            <HandymanIcon />
            <p className="mb-5">Simple, ready-to-use interface endpoints that are paid for per request. No commitments, only pay for what you use with Nscale Serverless.</p>
                  
            <Link href="/new">New Fine-tuning Job</Link>
          </Card>
        </Card>
      </div>
    </div>
  );
}
