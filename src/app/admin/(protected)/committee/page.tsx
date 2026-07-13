import CommitteeManager from "@/components/admin/CommitteeManager";

export const metadata = {
  title: "Manage Committee | Admin DeepTech.ai",
};

export default function AdminCommitteePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-black text-ieee-black mb-2">Committee Management</h1>
        <p className="text-ieee-gray">Add, edit, or remove committee members. Images are automatically uploaded to Cloudinary.</p>
      </div>
      
      <CommitteeManager />
    </div>
  );
}
