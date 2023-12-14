import React, { useEffect, useState } from 'react';
import Client from "comfy.js";
import { useSocket } from "#app/context.tsx";
import {log} from "util";
// import { WebcastPushConnection } from "#node_modules/tiktok-live-connector/dist/index.js";


export default function ChatRoute() {
    const [messages, setMessages] = useState([]);
    const socket = useSocket();

    console.log('messages', messages);

    // Youtube Chat
    useEffect(() => {
        if (!socket) return;

        socket.on("event", (data) => {
            console.log("data", data);
        });

        socket.on("serverMsg", function (msg) {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

    }, [socket]);



    // Twitch Chat
    useEffect(() => {
        // timmeh
        const twitchUsername = 'darkness429';
        // bearded blevins
        // const twitchUsername = 'beardedblevins';

        Client.onChat = (user, message, flags, self, extra) => {
            console.log('EXTRAS', extra);
            console.log('FLAGS', flags);
            console.log('SELF', self);
            console.log('MESSAGE', message);
            let emoteMessage;
            if (extra.messageEmotes) {
                // If we have emotes, grab the images
                const emotes = Object.keys(extra.messageEmotes);
                // emoteMessage = emotes.map(emote => (`https://static-cdn.jtvnw.net/emoticons/v2/${emote}/default/dark/3.0`));
                // replace emote words with images

            }

            const twitchMessage = `TWITCH-[${user}]: ${message}`;
            setMessages((prevMessages) => [...prevMessages, twitchMessage]);
        };

        Client.Init(twitchUsername);
        Client.GetClient();
    }, []);

    // TikTok Chat
    // useEffect(() => {
    //     const tiktokUsername = 'YOUR_TIKTOK_USERNAME';
    //     const tiktokLiveConnector = new WebcastPushConnection();
    //
    //     tiktokLiveConnector.on('message', (message) => {
    //         setMessages((prevMessages) => [...prevMessages, message]);
    //     });
    //
    //     tiktokLiveConnector.connect(tiktokUsername);
    // }, []);


    console.log('messages', messages)
    return (
        <div className="container py-6">
            <h1>Streaming Chat App</h1>
            <ul className="overflow-y-auto">
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
}
