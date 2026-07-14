import connectToDatabase from "@/lib/db";
import CommitteeModel from "@/models/Committee";
import CommitteeTabs from "./CommitteeTabs";

export default async function Committee() {
  await connectToDatabase();
  const committeeItems = await CommitteeModel.find().sort({ order: 1 }).lean();

  // Convert MongoDB _id (ObjectId) to string so it can be passed to Client Component
  const serializedItems = committeeItems.map((item) => ({
    ...item,
    _id: (item._id as { toString(): string }).toString(),
  }));

  return (
    <section id="committee" className="py-16 md:py-24 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="inline-flex items-center text-sm font-bold tracking-widest text-ieee-orange uppercase mb-4 border border-ieee-orange/30 bg-ieee-orange/5 px-4 py-2 rounded-full">
            Behind the Scenes
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-ieee-black tracking-tight mt-4">
            Conference Committee
          </h2>
        </div>
        <CommitteeTabs members={serializedItems as any} />
      </div>
    </section>
  );
}
