import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [wishes, setWishes] = useState<any[]>([]);

  const fetchWishes = async () => {
    const { data } = await supabase
      .from("wishes")
.select("*")
.eq("status", "pending")   // 🔥 only pending
.order("created_at", { ascending: false });

    if (data) setWishes(data);
  };

  useEffect(() => {
  fetchWishes();

  const channel = supabase
    .channel("realtime-wishes")
    .on(
      "postgres_changes",
      {
        event: "*", // INSERT, UPDATE, DELETE
        schema: "public",
        table: "wishes",
      },
      (payload) => {
        console.log("Realtime change:", payload);
        fetchWishes(); // 🔥 auto refresh
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  const updateStatus = async (id: string, status: string) => {
  console.log("Updating:", id);

  const { data, error } = await supabase
    .from("wishes")
    .update({ status })
    .match({ id: id })   // ✅ CHANGE HERE
    .select();

  console.log("RESULT:", data, error);

  if (error) {
    console.error("Update failed:", error);
    alert("Update failed");
    return;
  }

  if (!data || data.length === 0) {
    alert("No row matched. Check ID column.");
    return;
  }

  fetchWishes();
};

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl mb-6">Admin Dashboard</h1>

      {wishes.map((w) => (
        <div
          key={w.id}
          className="border border-white/20 p-4 mb-4 rounded-lg"
        >
        <pre>{JSON.stringify(w, null, 2)}</pre>
          <p className="text-lg">{w.message}</p>
          <p className="text-sm text-gray-400">{w.name}</p>
          <p className="text-xs">{w.status}</p>

          <div className="mt-3 flex gap-3">
            <button
              onClick={() => updateStatus(w.id, "approved")}
              className="bg-green-500 px-3 py-1 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => updateStatus(w.id, "rejected")}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}