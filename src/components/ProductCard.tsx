import { DollarSign, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  authorUsername: string;
  authorImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
  price: number;
}

const ProductCard = ({
  id,
  name,
  imageUrl,
  authorUsername,
  authorImageUrl,
  reviewRating,
  reviewCount,
  price,
}: ProductCardProps) => {
  return (
    <div className="">
      <Link href={`/products/${id}`}>
        <div className="border rounded-md bg-background overflow-hidden h-full flex flex-col hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[4px] dark:bg-background dark:border-primary dark:shadow-primary cursor-pointer transition-all duration-200">
          <div className="relative aspect-square">
            <Image
              alt={name}
              fill
              className="object-cover"
              src={imageUrl || "/enearby-bg.png"}
            />
          </div>
          <div className="p-4 border-y flex flex-col gap-3 flex-1 ">
            <h2 className="text-lg font-medium line-clamp-4 ">{name}</h2>
            <div className="flex items-center gap-2" onClick={() => {}}>
              {authorImageUrl && (
                <Image
                  src={authorImageUrl}
                  alt={authorUsername}
                  className="rounded-full shrink-0 size-[16px]"
                  width={16}
                  height={16}
                />
              )}
              <span className="text-sm line-clamp-1 underline font-medium">
                {authorUsername}
              </span>
            </div>
            {reviewCount > 0 && (
              <div className="flex items-center gap-1">
                <StarIcon className="size-3.5 fill-black" />
                <p className="text-sm font-medium">
                  {reviewRating} ({reviewCount})
                </p>
              </div>
            )}
          </div>
          <div className="p-4 ">
            <div className="relative px-2 py-1 border bg-pink-400 w-fit">
              <p className="flex items-center gap-1 text-md font-medium">
                <DollarSign className="size-3.5" />
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })
                  .format(Number(price))
                  .replace("$", "")}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

export const ProductSkeleton = () => {
  return (
    <div className="w-full aspect-3/4 bg-secondary-foreground rounded-md animate-pulse" />
  );
};
