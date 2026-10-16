import { cn } from "@workspace/ui/lib/utils";
import type { ComponentProps, ElementType } from "react";

export interface SkeletonProps extends ComponentProps<"div"> {
	as?: ElementType;
}

function Skeleton({
	as: Component = "div",
	className,
	...props
}: SkeletonProps) {
	return (
		<Component
			data-slot="skeleton"
			className={cn(
				"animate-pulse rounded-md bg-muted",
				Component === "span" && "inline-block",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
