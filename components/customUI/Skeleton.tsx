import { Skeleton } from "@/components/ui/skeleton";

// Responsive container wrapper (can create a separate component)
const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto min-w-[320px] max-w-[1400px] px-4 sm:px-6 lg:px-8">
    {children}
  </div>
);

export function CardSkeleton() {
  return (
    <ResponsiveContainer>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-full rounded-lg bg-gray-100 dark:bg-gray-800 md:rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-gray-100 dark:bg-gray-800 md:w-4/5" />
          <Skeleton className="h-4 w-full bg-gray-100 dark:bg-gray-800 md:w-3/4" />
          <Skeleton className="h-4 w-1/2 bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>
    </ResponsiveContainer>
  );
}

export function ProfileSkeleton() {
  return (
    <ResponsiveContainer>
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Skeleton className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800" />
        <div className="w-full space-y-2 text-center sm:text-left">
          <Skeleton className="mx-auto h-4 w-3/4 bg-gray-100 dark:bg-gray-800 sm:mx-0 sm:w-48" />
          <Skeleton className="mx-auto h-3 w-1/2 bg-gray-100 dark:bg-gray-800 sm:mx-0 sm:w-32" />
        </div>
      </div>
    </ResponsiveContainer>
  );
}

export function TableSkeleton() {
  return (
    <ResponsiveContainer>
      <div className="w-full space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-12 w-full bg-gray-100 dark:bg-gray-800"
          />
        ))}
      </div>
    </ResponsiveContainer>
  );
}

export function DashboardSkeleton() {
  return (
    <ResponsiveContainer>
      <div className="flex flex-col space-y-6 py-4">
        {/* Header Section */}
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <Skeleton className="h-8 w-full bg-gray-100 dark:bg-gray-800 md:w-64" />
          <Skeleton className="h-10 w-full bg-gray-100 dark:bg-gray-800 md:w-48" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-32 w-full bg-gray-100 dark:bg-gray-800"
            />
          ))}
        </div>

        {/* Content Section */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-full bg-gray-100 dark:bg-gray-800 md:w-1/3" />
          <Skeleton className="h-4 w-full bg-gray-100 dark:bg-gray-800" />
          <Skeleton className="h-4 w-full bg-gray-100 dark:bg-gray-800" />
          <Skeleton className="h-4 w-3/4 bg-gray-100 dark:bg-gray-800" />
        </div>

        {/* Chart Area */}
        <Skeleton className="h-64 w-full rounded-lg bg-gray-100 dark:bg-gray-800 md:h-96" />
      </div>
    </ResponsiveContainer>
  );
}
