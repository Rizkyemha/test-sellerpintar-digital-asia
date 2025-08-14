import Image from "next/image";

type LogoProps = {
	white?: boolean;
} & React.ComponentProps<"img">;

export function Logo({ white = false, className, ...props }: LogoProps) {
	return (
		<Image
			className={className}
			src={white ? "/logo_white.svg" : "/logo.svg"}
			alt='Logo'
			width={134}
			height={24}
		/>
	);
}
