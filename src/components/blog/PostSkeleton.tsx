import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

interface PostSkeletonProps {
  compact?: boolean;
}

export function PostSkeleton({ compact = false }: PostSkeletonProps) {
  return (
    <Card className={`overflow-hidden ${compact ? 'h-full' : ''}`}>
      <div className={`${compact ? 'h-48' : 'h-64'}`}>
        <Skeleton className="w-full h-full" />
      </div>
      
      <CardHeader className={compact ? 'pb-3' : 'pb-4'}>
        <Skeleton className={`${compact ? 'h-5' : 'h-6'} w-full`} />
        <Skeleton className={`${compact ? 'h-5' : 'h-6'} w-3/4`} />
      </CardHeader>

      <CardContent className={compact ? 'pt-0 pb-3' : 'pt-0 pb-4'}>
        {!compact && (
          <>
            <div className="space-y-2 mb-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </>
        )}
        
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>

      {!compact && (
        <CardFooter className="pt-0 border-t">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}