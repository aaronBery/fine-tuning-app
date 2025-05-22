import { Card } from "@mui/material";

interface OverViewCardProps {
    title: string;
    strapline?: string;
    children: React.ReactNode
}

export const OverViewCard = ({title, strapline, children} : OverViewCardProps) => {
    return (
        <Card className="flex flex-row pt-5 pb-5">
            <div className="p-3">
                {children}
            </div>
            <div className="grid content-center">
                <h2 className="font-bold">{title}</h2>
                { strapline && <p className="text-gray-500">{strapline}</p> }
            </div>
        </Card>
    );
}