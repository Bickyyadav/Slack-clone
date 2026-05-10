import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

export const serverClient = StreamChat.getInstance(
    ENV.STREAM_API_KEY,
    ENV.STREAM_API_SECRET
);


export const upsertStreamUser = async (userData) => {
    try {
        serverClient.upsertUser(userData);
        console.log("Stream user upserted successfully:", userData.name);
    } catch (error) {
        console.log("Error upserting Stream user:", error);
    }
}



export const deleteStreamUser = async (userId) => {
    try {
        await streamClient.deleteUser(userId);
        console.log("Stream user deleted successfully:", userId);
    } catch (error) {
        console.error("Error deleting Stream user:", error);
    }
};


export const generateStreamToken = async (userId) => {
    try {
        const userIdString = userId.string()
        const token = serverClient.createToken(userIdString);
        console.log("Stream client token generated successfully for user:", userIdString);
        return token;
    } catch (error) {
        console.error("Error generating Stream client token:", error);
    }
};


export const addUserToPublicChannels = async (newUserId) => {
    const publicChannels = await streamClient.queryChannels({ discoverable: true });

    for (const channel of publicChannels) {
        await channel.addMembers([newUserId]);
    }
}