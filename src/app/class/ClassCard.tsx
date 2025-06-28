import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Class } from "@/lib/types";
import Link from "next/link";

const ClassCard: React.FC<Partial<Class>> = ({
  id,
  title,
  description,
  tutorName,
  tutorTitle,
}) => {
  return (
    <Link href={`/class/${id}`}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="flex">{description}</CardDescription>
        </CardHeader>

        <CardFooter className="flex flex-col justify-between text-sm items-start">
          <p>Diajar oleh:</p>
          <p>{tutorName}</p>
          <p>{tutorTitle}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ClassCard;
