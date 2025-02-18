import Link from "next/link";
import {
  ArrowRight,
  CreditCard,
  FolderSync,
  PackageSearch,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import BannerImg from "@/assets/images/banner-1.png";
import BannerImg2 from "@/assets/images/banner-2.png";
import BannerImg3 from "@/assets/images/banner-3.png";
const features = [
  {
    title: "Free Shipping",
    description: "Free shipping on all your order",
    icon: PackageSearch,
  },
  {
    title: "Customer Support 24/7",
    description: "Instant access to support",
    icon: Phone,
  },
  {
    title: "100% Secure Payment",
    description: "We ensure your money is safe",
    icon: CreditCard,
  },
  {
    title: "Money-Back Guarantee",
    description: "30 Days Money-Back Guarantee",
    icon: FolderSync,
  },
];

const Hero = () => {
  return (
    <section className="container pt-12 space-y-8">
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-[#005C2B] to-[#0064009e] text-white">
          <div className="px-6 lg:px-12 py-8 lg:py-16 flex flex-col justify-center h-full">
            <div className="relative z-10 max-w-md space-y-4">
              <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl">
                Fresh & Healthy Organic Food
              </h1>
              <p className="text-green-100">Sale up to 30% OFF</p>
              <p className="text-sm text-green-100">
                Free shipping on all your order
              </p>
              <Button
                asChild
                className="bg-white text-green-600 hover:bg-green-50"
              >
                <Link href="/shop" className="inline-flex items-center gap-2">
                  Shop now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 h-full w-full flex justify-end">
            <Image
              className="object-contain object-right-bottom w-1/2"
              src={BannerImg}
              alt="Fresh food"
            />
          </div>
        </div>

        {/* Side Banners */}
        <div className="grid gap-6">
          <div className="rounded-xl overflow-hidden relative border border-gray-200/80 bg-gray-50">
            <div className="px-6 py-10 relative z-10">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground uppercase">
                  Summer Sale
                </div>
                <h2 className="text-3xl font-bold">75% OFF</h2>
                <p className="text-sm text-muted-foreground">
                  Only Fruit & Vegetable
                </p>
                <Button variant="link" asChild className="p-0 text-green-600">
                  <Link href="/shop" className="inline-flex items-center gap-2">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 h-full w-full flex justify-end z-0">
              <Image
                className="object-contain object-right"
                src={BannerImg3}
                alt="Fresh food"
              />
            </div>
          </div>
          <div className="overflow-hidden bg-gradient-to-r from-[#005C2B] to-[#0064009e]  text-white rounded-xl relative">
            <div className="px-6 py-10 relative z-10">
              <div className="space-y-2">
                <div className="text-sm uppercase">Best Deal</div>
                <h2 className="text-2xl font-bold">Special Products</h2>
                <p className="text-sm">Deal of the Month</p>
                <Button variant="link" asChild className="p-0 text-white">
                  <Link href="/shop" className="inline-flex items-center gap-2">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 top-0 h-full flex">
              <Image
                className="object-contain object-right"
                src={BannerImg2}
                alt="Fresh food"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature?.title}
            className="border border-gray-100 smooth-transform rounded-xl hover:scale-[1.02] shadow-sm"
          >
            <div className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-green-100 p-2.5">
                <feature.icon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">{feature?.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
