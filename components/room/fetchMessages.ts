import { TypedSupabaseClient } from "@/utils/types";

export interface Message {
  id: number;
  room_id: number;
  user_id: string | null;
  content: string | null;
  created_at: string;
}

const PAGE_SIZE = 15;

export const fetchMessages = async (
  supabase: any,
  roomId: number,
  page: number
) => {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from("room_chat")
    .select("*", { count: "exact" })
    .eq("room_id", roomId)
    .order("created_at", { ascending: false }) // Newest first
    .range(from, to);

  if (error) {
    return { data: [], totalCount: 0 };
  }

  return { data: data.reverse(), totalCount: count ?? 0 }; // Reverse for bottom-up rendering
};
