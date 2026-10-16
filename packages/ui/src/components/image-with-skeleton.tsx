import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import { type ComponentProps, useEffect, useRef, useState } from "react";

export interface ImageWithSkeletonProps extends ComponentProps<"img"> {
	skeletonClassName?: string;
	containerClassName?: string;
}

export function ImageWithSkeleton({
	src,
	alt = "",
	className,
	skeletonClassName,
	containerClassName,
	onLoad,
	onError,
	...props
}: ImageWithSkeletonProps) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		setIsLoaded(false);
		setHasError(false);

		if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
			setIsLoaded(true);
		}
	}, [src]);

	return (
		<div className={cn("relative overflow-hidden size-full", containerClassName)}>
			{!isLoaded && !hasError && (
				<Skeleton
					className={cn(
						"absolute inset-0 size-full z-0 bg-navy/10 animate-pulse",
						skeletonClassName,
					)}
				/>
			)}
			<img
				ref={imgRef}
				src={src}
				alt={alt}
				onLoad={(e) => {
					setIsLoaded(true);
					onLoad?.(e);
				}}
				onError={(e) => {
					setHasError(true);
					onError?.(e);
				}}
				className={cn(
					className,
					"transition-opacity duration-300",
					!isLoaded ? "opacity-0" : "opacity-100",
				)}
				{...props}
			/>
		</div>
	);
}
