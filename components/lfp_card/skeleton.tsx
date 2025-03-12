import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function LfpRoomSkeleton() {
  return (
    <Card className="inline-block rounded-lg p-4 shadow-lg shadow-black/5 max-w-[560px] w-full min-w-full">
      <div className="flex h-full w-full flex-row justify-between">
        <div className="flex flex-col items-center justify-between relative pr-2">
          <div className="flex flex-col items-center gap-4 w-16">
            <div className="relative">
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="absolute bottom-0 end-0 size-3 rounded-full" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-4 w-16 rounded-full" />
            </div>
          </div>
          <Skeleton className="absolute bottom-0 left-4 h-9 w-9 rounded-full" />
        </div>
        <div className="ml-1 flex w-full max-w-full flex-col justify-between pl-2 sm:ml-2 sm:pl-[10px]">
          <div className="flex flex-row">
            <div className="flex w-full flex-col pr-2">
              <div className="flex w-full items-start justify-between">
                <div className="flex w-full flex-col gap-2">
                  <div className="flex w-full flex-col items-start gap-1 md:flex-row md:items-center">
                    <Skeleton className="h-5 w-24" />
                    <div className="flex items-start justify-start gap-1">
                      <Skeleton className="h-3 w-8" />
                      <Skeleton className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
              <Skeleton className="mt-2 h-4 w-3/4" />
              <div className="mt-2 flex w-full justify-between items-center">
                <div className="flex flex-row gap-1">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="flex w-max flex-wrap gap-[5px]">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="text-foreground ml-[5px] mt-4 flex h-full flex-col justify-between gap-1">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
            <div className="mt-4 flex flex-row items-center justify-end gap-[5px]">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
