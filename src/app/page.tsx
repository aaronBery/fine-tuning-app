import { Job, Jobs } from "@/models/job.model";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Suspense } from "react";

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

  console.log(jobsListing.summary)

  if (!jobsListing || !jobsListing?.summary) {
    return <p>Loading...</p>
  }

  return (
    <Suspense>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Job ID</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobsListing.jobs.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </TableContainer>
  </Suspense>
  );
}
