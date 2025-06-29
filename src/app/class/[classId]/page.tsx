"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import api from "@/lib/api";
import { Class } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  User,
  GraduationCap,
  Lock,
  PlayCircle,
  BookOpen,
  Crown,
  Clock,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function ClassDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { email } = useUser();
  const classId = params.classId as string;

  const [classData, setClassData] = useState<Class | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openSubchapters, setOpenSubchapters] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/class/${classId}`);
        setClassData(response.data.data);
      } catch (err: any) {
        setError("Failed to load class details");
        console.error("Error fetching class:", err);
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      fetchClassDetail();
    }
  }, [classId]);

  const handleSubchapterClick = (subchapter: any) => {
    if (!email && !subchapter.isFree) {
      router.push("/langganan");
      return;
    }

    if (!subchapter.content && !subchapter.isFree) {
      router.push("/langganan");
      return;
    }

    const newOpenSubchapters = new Set(openSubchapters);
    if (newOpenSubchapters.has(subchapter.id)) {
      newOpenSubchapters.delete(subchapter.id);
    } else {
      newOpenSubchapters.add(subchapter.id);
    }
    setOpenSubchapters(newOpenSubchapters);
  };

  const getTotalSubchapters = () => {
    if (!classData) return 0;
    return classData.chapters.reduce(
      (total, chapter) => total + chapter.subchapters.length,
      0
    );
  };

  const getFreeSubchapters = () => {
    if (!classData) return 0;
    return classData.chapters.reduce(
      (total, chapter) =>
        total + chapter.subchapters.filter((sub) => sub.isFree).length,
      0
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat detail kelas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !classData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center text-red-600">
            <p>{error ?? "Kelas tidak ditemukan"}</p>
            <Button
              onClick={() => router.push("/class")}
              className="mt-4"
              variant="outline"
            >
              Kembali ke Daftar Kelas
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-4xl mx-auto px-8">
        <Card className="mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl font-bold mb-4">
                  {classData.title}
                </CardTitle>
                <p className="text-xl text-blue-100 mb-6">
                  {classData.description}
                </p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-200" />
            </div>

            <div className="bg-white/10 rounded-lg p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{classData.tutorName}</h3>
                <p className="text-blue-100">{classData.tutorTitle}</p>
              </div>
              <div className="ml-auto">
                <GraduationCap className="w-8 h-8 text-blue-200" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {classData.chapters.length}
                </div>
                <div className="text-gray-600">Chapters</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {getTotalSubchapters()}
                </div>
                <div className="text-gray-600">Total Materi</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {getFreeSubchapters()}
                </div>
                <div className="text-gray-600">Materi Gratis</div>
              </div>
            </div>

            {!email && (
              <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Crown className="w-6 h-6 text-yellow-600" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-yellow-800">
                      Akses Terbatas
                    </h4>
                    <p className="text-yellow-700">
                      Anda hanya dapat mengakses materi gratis. Berlangganan
                      untuk membuka semua konten premium.
                    </p>
                  </div>
                  <Button
                    onClick={() => router.push("/langganan")}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                  >
                    Berlangganan
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <BookOpen className="w-6 h-6" />
              Materi Pembelajaran
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="space-y-4">
              {classData.chapters.map((chapter, chapterIndex) => (
                <AccordionItem
                  key={chapter.id}
                  value={`chapter-${chapter.id}`}
                  className="border border-gray-200 rounded-lg"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 rounded-t-lg">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                        {chapterIndex + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {chapter.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {chapter.subchapters.length} materi
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-6 pb-4">
                    {chapter.subchapters.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p>Belum ada materi untuk chapter ini</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {chapter.subchapters.map((subchapter, subIndex) => {
                          const isBlocked = !email && !subchapter.isFree;
                          const hasNoContent =
                            !subchapter.content && !subchapter.isFree;
                          const isOpen = openSubchapters.has(subchapter.id);
                          const canShowContent =
                            subchapter.content && (email || subchapter.isFree);

                          return (
                            <div
                              key={subchapter.id}
                              className="border border-gray-200 rounded-lg"
                            >
                              <div
                                className={`flex items-center gap-4 p-4 transition-all cursor-pointer ${
                                  isBlocked || hasNoContent
                                    ? "bg-gray-50 border-gray-200 hover:bg-gray-100"
                                    : "bg-white hover:bg-blue-50"
                                }`}
                                onClick={() =>
                                  handleSubchapterClick(subchapter)
                                }
                              >
                                <div className="w-6 h-6 flex items-center justify-center">
                                  {isBlocked || hasNoContent ? (
                                    <Lock className="w-5 h-5 text-gray-400" />
                                  ) : subchapter.isFree ? (
                                    <PlayCircle className="w-5 h-5 text-green-500" />
                                  ) : (
                                    <Crown className="w-5 h-5 text-purple-500" />
                                  )}
                                </div>

                                <div className="flex-1">
                                  <h4
                                    className={`font-medium ${
                                      isBlocked || hasNoContent
                                        ? "text-gray-600"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    {subIndex + 1}. {subchapter.title}
                                  </h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    {subchapter.isFree ? (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Gratis
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                        Premium
                                      </span>
                                    )}
                                    {(isBlocked || hasNoContent) && (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                        Terkunci
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  {(isBlocked || hasNoContent) && (
                                    <Button
                                      size="sm"
                                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        router.push("/langganan");
                                      }}
                                    >
                                      Buka Akses
                                    </Button>
                                  )}

                                  {canShowContent && (
                                    <div className="w-6 h-6 flex items-center justify-center">
                                      {isOpen ? (
                                        <ChevronDown className="w-4 h-4 text-gray-600" />
                                      ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-600" />
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {isOpen && canShowContent && (
                                <div className="border-t border-gray-200 p-6 bg-gray-50">
                                  <div className="prose max-w-none">
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                      {subchapter.content}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {isOpen && (isBlocked || hasNoContent) && (
                                <div className="border-t border-gray-200 p-6 bg-gray-50">
                                  <div className="text-center py-8">
                                    <Lock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                    <h4 className="text-lg font-semibold text-gray-700 mb-2">
                                      Konten Premium
                                    </h4>
                                    <p className="text-gray-600 mb-4">
                                      Berlangganan untuk mengakses materi
                                      pembelajaran ini
                                    </p>
                                    <Button
                                      onClick={() => router.push("/langganan")}
                                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                                    >
                                      Berlangganan Sekarang
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
