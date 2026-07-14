import PartnersManager from "@/components/admin/PartnersManager";

export const metadata = {
  title: "Manage Partners | Admin DeepTech.ai",
};

export default function AdminPartnersPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-black text-ieee-black mb-2">Partners Management</h1>
        <p className="text-ieee-gray">Add, edit, or remove partners. Images are automatically uploaded to Cloudinary.</p>
      </div>
      
      <PartnersManager />
    </div>
  );
}
