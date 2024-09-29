import clientPromise from "@/app/utils/mongo";

export async function POST(req) {
  const body = await req.json();
  const { userName, chatRoom } = body;
  console.log("POST.body", body);

  try {
    const client = await clientPromise;
    const db = client.db("real-talks");

    // Check if the user already exists
    let user = await db.collection("users").findOne({ username: userName });

    // If the user doesn't exist, create a new one
    if (!user) {
      const newUser = {
        username: userName,
        createdAt: new Date(),
        lastSeen: new Date(),
        status: "online",
      };

      const insertResult = await db.collection("users").insertOne(newUser);
      if (!insertResult?.insertedId) {
        return new Response(
          JSON.stringify({ message: "Failed to create new user" }),
          { status: 500 }
        );
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
    console.log("chatRoomData", chatRoomData);
    // If the chat room doesn't exist, create a new one
    if (!chatRoomData) {
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
        return new Response(
          JSON.stringify({ message: "Failed to create new chat room" }),
          { status: 500 }
        );
      }

      // Retrieve the newly created chat room
      chatRoomData = await db
        .collection("conversations")
        .findOne({ _id: chatRoomInsert.insertedId });

      return new Response(
        JSON.stringify({
          message: `Created new chat room: ${chatRoom}`,
          user,
          chatRoomData,
        }),
        { status: 201 }
      );
    }

    return new Response(
      JSON.stringify({
        message: `Entered chat room: ${chatRoom}`,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
