"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const HomePage = () => {
  const [value, setValue] = useState("");

  const trpc = useTRPC();

  const router = useRouter();

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: (data) => {
        router.push(`/projects/${data.id}`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button
        disabled={createProject.isPending}
        onClick={() => {
          createProject.mutate({
            value: value,
          });
        }}
      >
        Invoke Background Job
      </Button>
    </div>
  );
};

export default HomePage;
