import React, { useEffect, useState } from 'react';
import Client from "comfy.js";
import { useSocket } from "#app/context.tsx";


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

        socket.on("ytmsg", function (msg) {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.on("tiktokmsg", function (msg) {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

    }, [socket]);



    // Twitch Chat
    useEffect(() => {
        // timmeh
        // const twitchUsername = 'darkness429';
        // bearded blevins
        const twitchUsername = 'beardedblevins';

        Client.onChat = (user, message, flags, self, extra) => {
            // console.log('EXTRAS', extra);
            // console.log('FLAGS', flags);
            // console.log('SELF', self);
            // console.log('MESSAGE', message);
            let emoteMessage;
            if (extra.messageEmotes) {
                // If we have emotes, grab the images
                const emotes = Object.keys(extra.messageEmotes);
                // emoteMessage = emotes.map(emote => (`https://static-cdn.jtvnw.net/emoticons/v2/${emote}/default/dark/3.0`));
                // replace emote words with images

            }

            const twitchMessage = {
                username: user,
                message: message,
                platform: "TWITCH",
                member: extra.userState,
            };

            // const twitchMessage = `TWITCH-[${user}]: ${message}`;

            setMessages((prevMessages) => [...prevMessages, twitchMessage]);
        };

        Client.Init(twitchUsername);
        Client.GetClient();
    }, []);

    // TikTok Chat
    // useEffect(() => {
    //     const tiktokUsername = 'beardedblevins';
    //     const tiktokLiveConnector = new WebcastPushConnection(tiktokUsername);
    //
    //     tiktokLiveConnector.on('chat', data => {
    //         console.log(`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
    //     })
    //
    //     // tiktokLiveConnector.on('message', (message) => {
    //     //     setMessages((prevMessages) => [...prevMessages, message]);
    //     // });
    //
    //     tiktokLiveConnector.connect().then(state => {
    //         console.info(`Connected to roomId ${state.roomId}`);
    //     }).catch(err => {
    //         console.error('Failed to connect', err);
    //     })
    // }, []);


    console.log('messsage', messages);
    return (
        <div className="container py-6">
            <h1>Streaming Chat App</h1>
            <ul className="overflow-y-auto">
                {messages.map((message, index) => {
                    switch (message.platform) {
                        case 'TWITCH':
                            return (
                                <li className="flex">
                                    <div className="w-6">
                                        <svg enable-background="new 0 0 50 50" id="Layer_1" version="1.1" viewBox="0 0 50 50" xml:space="preserve"><path d="M45,1H5C2.8,1,1,2.8,1,5v40c0,2.2,1.8,4,4,4h40c2.2,0,4-1.8,4-4V5C49,2.8,47.2,1,45,1z" fill="#6441A5"/><g id="_x7C___x7C_"><path d="M31,36h-6l-3,4h-4v-4h-7V15.1l2-5.1h26v18L31,36z M36,27V13H15v19h6v4l4-4h6L36,27z" fill="#FFFFFF" id="Dialog"/><rect fill="#FFFFFF" height="8" id="_x7C_" width="3" x="28" y="18"/><rect fill="#FFFFFF" height="8" id="_x7C__2_" width="3" x="22" y="18"/></g></svg>
                                    </div>
                                    <div className="text-violet-600">[{message.username}]:</div>
                                    {message.message}
                                </li>
                            )
                            break;
                        case 'YOUTUBE':
                            return (
                                <li className="flex">
                                    <div className="w-6">
                                        <svg enable-background="new 0 0 128 128" id="Social_Icons" version="1.1" viewBox="0 0 128 128" xml:space="preserve" ><g id="_x34__stroke"><g id="Youtube_1_"><rect clip-rule="evenodd" fill="none" fill-rule="evenodd" height="128" width="128"/><path clip-rule="evenodd" d="M126.72,38.224c0,0-1.252-8.883-5.088-12.794    c-4.868-5.136-10.324-5.16-12.824-5.458c-17.912-1.305-44.78-1.305-44.78-1.305h-0.056c0,0-26.868,0-44.78,1.305    c-2.504,0.298-7.956,0.322-12.828,5.458C2.528,29.342,1.28,38.224,1.28,38.224S0,48.658,0,59.087v9.781    c0,10.433,1.28,20.863,1.28,20.863s1.248,8.883,5.084,12.794c4.872,5.136,11.268,4.975,14.116,5.511    c10.24,0.991,43.52,1.297,43.52,1.297s26.896-0.04,44.808-1.345c2.5-0.302,7.956-0.326,12.824-5.462    c3.836-3.912,5.088-12.794,5.088-12.794S128,79.302,128,68.868v-9.781C128,48.658,126.72,38.224,126.72,38.224z M50.784,80.72    L50.78,44.501l34.584,18.172L50.784,80.72z" fill="#CE1312" fill-rule="evenodd" id="Youtube"/></g></g></svg>
                                    </div>
                                    <div className="text-rose-600">[{message.username}]:</div>
                                    {message.message}
                                </li>
                            )
                            break;
                        case 'TIKTOK':
                            return (
                                <li className="flex">
                                    <div className="w-6">
                                        <svg version="1.1" viewBox="0 0 64 64" xml:space="preserve"><g id="guidlines"/><g id="FB"/><g id="ig"/><g id="yt"/><g id="twitter"/><g id="snapchat"/><g id="WA"/><g id="Pinterrest"/><g id="Layer_9"/><g id="Layer_10"/><g id="Layer_11"><g><g><path class="st11" d="M58,19.4v9.3c-0.5,0-1.1,0.1-1.7,0.1c-4.5,0-8.7-1.7-11.9-4.4v19.8c0,4-1.3,7.8-3.6,10.8     c-3.2,4.3-8.4,7.2-14.3,7.2c-6.4,0-12-3.4-15.1-8.4c3.2,3,7.5,4.9,12.2,4.9c5.8,0,11-2.8,14.2-7.2c2.2-3,3.6-6.7,3.6-10.8V20.8     c3.2,2.8,7.3,4.4,11.9,4.4c0.6,0,1.1,0,1.7-0.1v-6c0.9,0.2,1.7,0.3,2.6,0.3H58z"/><path class="st11" d="M29,26.3v10.3c-0.7-0.2-1.5-0.3-2.2-0.3c-4.4,0-8,3.7-8,8.2c0,1,0.2,1.9,0.5,2.8c-2-1.5-3.4-3.9-3.4-6.6     c0-4.5,3.6-8.2,8-8.2c0.8,0,1.5,0.1,2.2,0.3l0-6.6c0.2,0,0.4,0,0.6,0C27.5,26.2,28.3,26.2,29,26.3z"/><path class="st11" d="M45.9,12c-1.8-1.6-3.1-3.8-3.8-6.1h2.4c0,0.5,0,0.9,0,1.4C44.7,8.9,45.2,10.5,45.9,12z"/></g></g><path d="M55.1,19.2v6c-0.5,0.1-1.1,0.1-1.7,0.1c-4.5,0-8.7-1.7-11.9-4.4v19.8c0,4-1.3,7.8-3.6,10.8c-3.3,4.4-8.4,7.2-14.2,7.2   c-4.7,0-9-1.9-12.2-4.9c-1.7-2.8-2.7-6-2.7-9.5c0-9.7,7.7-17.6,17.3-17.9l0,6.6c-0.7-0.2-1.5-0.3-2.2-0.3c-4.4,0-8,3.7-8,8.2   c0,2.7,1.3,5.2,3.4,6.6c1.1,3.1,4.1,5.4,7.5,5.4c4.4,0,8-3.7,8-8.2V5.9h7.3c0.7,2.4,2,4.5,3.8,6.1C47.7,15.6,51.1,18.3,55.1,19.2z"/><g><g><g><path class="st12" d="M26.1,22.8l0,3.4c-9.6,0.3-17.3,8.2-17.3,17.9c0,3.5,1,6.7,2.7,9.5C8.1,50.3,6,45.7,6,40.5      c0-9.9,8-17.9,17.8-17.9C24.6,22.6,25.4,22.7,26.1,22.8z"/><path class="st12" d="M42.1,5.9h-7.3v38.6c0,4.5-3.6,8.2-8,8.2c-3.5,0-6.4-2.2-7.5-5.4c1.3,0.9,2.9,1.5,4.6,1.5      c4.4,0,8-3.6,8-8.1V2h9.7v0.2c0,0.4,0,0.8,0.1,1.2C41.7,4.2,41.9,5.1,42.1,5.9z"/></g></g><path class="st12" d="M55.1,15.5C55.1,15.5,55.1,15.5,55.1,15.5v3.6c-4-0.8-7.4-3.5-9.3-7.1C48.3,14.3,51.5,15.6,55.1,15.5z"/></g></g><g id="Layer_12"/><g id="Layer_13"/><g id="Layer_14"/><g id="Layer_15"/><g id="Layer_16"/><g id="Layer_17"/></svg>
                                    </div>
                                    <span className="text-slate-300">[{message.username}]:</span>
                                    {message.message}
                                </li>
                            )
                            break;
                        default:
                            return <li></li>
                            console.log(`Sorry, no platform`);
                    }
                })}
            </ul>
        </div>
    );
}
