"use client";

import Image from "next/image";

type PetAvatarProps = {
  image?: string | null;
  name: string;
  size?: number; // width and height in px
};

export default function PetAvatar({ image, name, size = 120 }: PetAvatarProps) {
  return (
    <div
      className="pet-avatar-wrapper"
      style={{
        width: size,
        height: size,
      }}
    >
      <div className="pet-avatar-inner w-full h-full">
        {image ? (
          <Image
            src={image}
            alt={`${name}'s picture`}
            width={size}
            height={size}
            className="object-cover w-full h-full"
            onError={() => console.error("Image failed to load:", image)}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-6xl md:text-7xl bg-blue-400 ">
            <span aria-hidden="true">😻</span>
            <span className="sr-only">No image available for {name} yet</span>
          </div>
        )}
      </div>
    </div>
  );
}
