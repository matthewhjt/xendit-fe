"use client";

import api from "@/lib/api";
import { Class } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import ClassCard from "./ClassCard";

export default function ClassPage() {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [classes, setClasses] = useState<Class[]>([]);

  const fetchData = async () => {
    try {
      setIsLoadingPage(true);
      const response = await api.get(`/class`);

      if (response.status === 200) {
        setClasses(response.data.data);
        setIsLoadingPage(false);
      }
    } catch (err: any) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoadingPage(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoadingPage) {
    return (
      <section className="flex items-center justify-center w-full">
        <Loader2 className="animate-spin text-primary-600" size={100} />
      </section>
    );
  }

  return (
    <section className="flex flex-col min-h-screen gap-y-14 bg-white mt-30">
      {classes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {classes.map((classItem) => (
            <ClassCard
              key={classItem.id}
              id={classItem.id}
              title={classItem.title}
              description={classItem.description}
              tutorName={classItem.tutorName}
              tutorTitle={classItem.tutorTitle}
            />
          ))}
        </div>
      ) : (
        <div>Belum ada kelas</div>
      )}
    </section>
  );
}
