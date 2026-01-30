interface Props {
  params: Promise<{ category: string; subcategory: string }>;
}

const Page = async ({ params }: Props) => {
  const { category, subcategory } = await params;
  return (
    <div className="space-x-2">
      <span>{category}</span>/<span className="ml-2">{subcategory}</span>
    </div>
  );
};

export default Page;
