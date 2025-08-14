import { Eye, EyeOff } from "lucide-react";
import React from "react";

type VisibilityProps = {
	className?: string;
	visible: boolean;
	size: number;
	toggleVisibility?: (e: React.MouseEvent) => void;
};

export function Visibility({
	className,
	visible = false,
	size = 20,
	toggleVisibility,
}: VisibilityProps) {
	const Icon = visible ? Eye : EyeOff;

	return (
		<button className={className} onClick={toggleVisibility}>
			<Icon size={size} />
		</button>
	);
}
