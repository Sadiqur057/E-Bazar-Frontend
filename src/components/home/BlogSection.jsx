import Image from "next/image";
import blogImg3 from "@/assets/images/blog-3.png";
import blogImg1 from "@/assets/images/blog-1.png";
import Link from "next/link";
const blogPosts = [
  {
    title: "10 Organic Recipes for a Healthy Lifestyle",
    description:
      "Discover delicious and nutritious recipes using organic ingredients that will boost your health and satisfy your taste buds.",
    image: blogImg1,
    link: "/",
  },
  {
    title: "The Benefits of Eating Seasonal Produce",
    description:
      "Learn why consuming seasonal fruits and vegetables is not only good for your health but also for the environment.",
    image: blogImg3,
    link: "/",
  },
  {
    title: "How to Start Your Own Organic Garden",
    description:
      "Get tips and tricks on creating your own organic garden, from choosing the right plants to maintaining soil health.",
    image: blogImg1,
    link: "/",
  },
];

export function BlogSection() {
  return (
    <section className="my-20">
      <div className="container px-4">
        <h2 className="text-3xl font-semibold text-start mb-8">
          Latest from Our Blog
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <div key={index} className="overflow-hidden rounded-xl bg-gray-50">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {post.description}
                </p>
                <Link
                  href={post.link}
                  className="text-green-600 hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
