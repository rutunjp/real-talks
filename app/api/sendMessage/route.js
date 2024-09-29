import clientPromise from "@/app/utils/mongo";

export async function POST(req) {
  const body = await req.json();
  const { userName, chatRoom } = body;
  console.log("POST.body", body);

  try {
    const client = await clientPromise;
    const db = client.db("real-talks");

    let user = await db.collection("users").findOne({ username: userName });
    if (!user) {
      const newUser = {
        username: userName,
        createdAt: new Date(),
        lastSeen: new Date(),
        status: "online",
      };

      const insertResult = await db.collection("users").insertOne(newUser);
      if (!insertResult.insertedId) {
        return new Response(JSON.stringify(user), {
          status: 500,
          message: "Failed to create new user",
        });
      }

      // Retrieve the newly created user
      user = await db
        .collection("users")
        .findOne({ _id: insertResult.insertedId });
    }

    // Check if the chat room exists
    let chatRoomData = await db
      .collection("conversations")
      .findOne({ _id: chatRoom });
    if (!chatRoomData) {
      // If chat room doesn't exist, create a new chat room
      const newChatRoom = {
        _id: chatRoom,
        name: chatRoom, // The name of the chat room (same as the ID)
        createdAt: new Date(),
        messages: [], // Empty messages array initially
      };

      const chatRoomInsert = await db
        .collection("conversations")
        .insertOne(newChatRoom);
      if (!chatRoomInsert.insertedId) {
        return new Response(JSON.stringify(user), {
          status: 500,
          message: "Failed to create new chat room",
        });
      }

      // Retrieve the newly created chat room
      chatRoomData = await db
        .collection("conversations")
        .findOne({ _id: chatRoomInsert.insertedId });
    }

    // Return success response
    return new Response(JSON.stringify(user), {
      status: 500,
      message: "Failed to create new chat room",
      user,
      chatRoomData,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(user), {
      status: 500,
      message: "Internal Server Error",
    });
  }
}
