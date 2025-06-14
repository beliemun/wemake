import type { SupabaseClient } from "@supabase/supabase-js";
import { type Database } from "~/supabase-client";

export const updateUser = async (
  client: SupabaseClient<Database>,
  {
    id,
    name,
    role,
    headline,
    bio,
  }: {
    id: string;
    name: string;
    role: "developer" | "designer" | "marketer" | "founder" | "product_manager";
    headline: string;
    bio: string;
  }
) => {
  const { error } = await client
    .from("profiles")
    .update({ name, role, headline, bio })
    .eq("profile_id", id);
  if (error) {
    throw error;
  }
};

export const updateUserAvatar = async (
  client: SupabaseClient<Database>,
  { id, avatar }: { id: string; avatar: string }
) => {
  const { error } = await client.from("profiles").update({ avatar }).eq("profile_id", id);
  if (error) {
    throw error;
  }
};

export const seeNotification = async (
  client: SupabaseClient<Database>,
  { notificationId, userId }: { notificationId: number; userId: string }
) => {
  const { error } = await client
    .from("notifications")
    .update({ seen: true })
    .eq("notification_id", notificationId)
    .eq("target_id", userId);
  if (error) {
    throw error;
  }
};

export const sendMessage = async (
  client: SupabaseClient<Database>,
  { fromUserId, toUserId, content }: { fromUserId: string; toUserId: string; content: string }
) => {
  const { data, error } = await client
    .rpc("get_room", {
      from_user_id: fromUserId,
      to_user_id: toUserId,
    })
    .maybeSingle(); // single()은 데이터가 없을 때 에러를 발생시키는데, maybeSingle()은 데이터가 없을 때 null을 반환한다.
  if (error) {
    throw error;
  }
  // 이미 존재하는 메시지 방이면 메시지 추가
  if (data?.message_room_id) {
    await client.from("messages").insert({
      message_room_id: data.message_room_id,
      sender_id: fromUserId,
      content,
    });
    return data.message_room_id;
  } else {
    // 새로운 메시지 방 생성
    const { data: roomData, error: roomError } = await client
      .from("message_rooms")
      .insert({})
      .select()
      .single();
    if (roomError) {
      throw roomError;
    }
    await client.from("message_room_members").insert([
      {
        message_room_id: roomData.message_room_id,
        profile_id: fromUserId,
      },
      {
        message_room_id: roomData.message_room_id,
        profile_id: toUserId,
      },
    ]);
    await client.from("messages").insert({
      message_room_id: roomData.message_room_id,
      sender_id: fromUserId,
      content,
    });
    console.log(22, roomData.message_room_id);
    return roomData.message_room_id;
  }
};

export const sendMessageToRoom = async (
  client: SupabaseClient<Database>,
  { senderId, content, messageRoomId }: { senderId: string; content: string; messageRoomId: string }
) => {
  // 유저가 메시지 방에 속해있는지 확인
  const { count, error: countError } = await client
    .from("message_room_members")
    .select("*", { count: "exact", head: true })
    .eq("message_room_id", Number(messageRoomId))
    .eq("profile_id", senderId);
  if (countError) {
    throw countError;
  }
  if (count === 0) {
    throw new Error("You are not a member of this message room");
  }
  const { error } = await client.from("messages").insert({
    message_room_id: Number(messageRoomId),
    sender_id: senderId,
    content,
  });
  if (error) {
    throw error;
  }
};
