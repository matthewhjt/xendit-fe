"use client";

import React, { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import useUser from "@/hooks/useUser";

const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { setId, setEmail } = useUser();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      try {
        const response = await api.post("/auth/login", values);
        if (response.status === 200) {
          const data = response.data;
          Cookies.set("accessToken", data.data.accessToken);
          const userResponse = await api.get("/auth/me");
          const userData = userResponse.data;
          setId(userData.user.id);
          setEmail(userData.user.email);
          router.push("/class");
        }
      } catch (error: any) {
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-2xl">Selamat Datang</CardTitle>
          <CardDescription>Silakan masuk ke akun Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700"
                disabled={isSubmitting}
              >
                {!isSubmitting ? "Login" : "Logging in..."}
              </Button>
            </form>
          </Form>

          <p className="text-sm text-center mt-6 text-gray-600">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-primary font-semibold hover:underline"
            >
              Register di sini
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
