import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ApplyNowButton({
  user,
  course,
  small = false
}: {
  user: any;
  course: string;
  small?: boolean;
}) {
  const target = `/contact?course=${encodeURIComponent(course)}`;
  const href = `/contact?course=${encodeURIComponent(course)}`;

  return (
    <Button asChild size={small ? "sm" : "lg"}>
      <Link href={href}>Apply Now</Link>
    </Button>
  );
}
