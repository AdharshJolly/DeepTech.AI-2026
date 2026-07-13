import SpeakersManager from "@/components/admin/SpeakersManager";

export const metadata = {
  title: "Manage Speakers | Admin DeepTech.ai",
};

export default function AdminSpeakersPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-black text-ieee-black mb-2">Speakers Management</h1>
        <p className="text-ieee-gray">Add, edit, or remove speakers. Images are automatically uploaded to Cloudinary.</p>
      </div>
      
      <SpeakersManager />
    </div>
  );
}
