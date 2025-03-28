
import { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import axios from 'axios';

const APP_ID = '3971079269d3419e81e137ff5edc4677';
const client = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });

export default function Live({ channelName, uid, role }: any) {
    console.log("The role is -> ",role)
    const [token, setToken] = useState(null);
    const [localAudioTrack, setLocalAudioTrack] = useState<any>(null);
    const [localVideoTrack, setLocalVideoTrack] = useState<any>(null);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [autoplayFailed, setAutoplayFailed] = useState(false);
    // Fetch token from server
    async function fetchToken() {
        try {
            const res = await axios.post('http://localhost:3000/admin/get-token', {
                channelName,
                uid,
            });
            if (res.data?.token) {
                setToken(res.data.token);
            }
        } catch (err) {
            console.error('Error fetching token:', err);
        }
    }

    useEffect(() => {
        fetchToken();
    }, [channelName, uid]);

    useEffect(() => {
        const handleAutoplayFailed = async () => {
            console.log('Autoplay failed. Please click the button to start playback.');
            setAutoplayFailed(true); // Show a button to prompt user interaction
        };

        AgoraRTC.onAutoplayFailed = handleAutoplayFailed;

        return () => {
            AgoraRTC.onAutoplayFailed = undefined; // Cleanup
        };
    }, []);


    useEffect(() => {
        if (token) {
            const init = async () => {
                try {
                    await client.join(APP_ID, channelName, token, uid);
                    await client.setClientRole(role);

                    if (role === 'host') {
                        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
                        const videoTrack = await AgoraRTC.createCameraVideoTrack();
                        setLocalAudioTrack(audioTrack);
                        setLocalVideoTrack(videoTrack);
                        await client.publish([audioTrack, videoTrack]);
                        videoTrack.play('local-stream');
                    }

                    client.on('user-published', async (user, mediaType) => {
                        await client.subscribe(user, mediaType);
                        if (mediaType === 'video') {
                            const remoteVideoTrack = user.videoTrack;
                            const remotePlayerContainer = document.createElement('div');
                            remotePlayerContainer.id = `user-${user.uid}`;
                            
                            document.getElementById('remote-streams')?.appendChild(remotePlayerContainer);
                            remoteVideoTrack?.play(remotePlayerContainer);
                        }
                        if (mediaType === 'audio') {
                            user.audioTrack?.play();
                        }
                    });

                    client.on('user-unpublished', (user) => {
                        const player = document.getElementById(`user-${user.uid}`);
                        if (player) player.remove();
                    });
                } catch (error) {
                    console.error('Error initializing Agora:', error);
                }
            };

            init();
        }
        return () => {
            client.leave();
        };
    }, [token]);

    const handleStartPlayback = async () => {
        if (localAudioTrack) {
            await localAudioTrack.play();
        }
        if (localVideoTrack) {
            await localVideoTrack.play('local-stream');
        }
        setAutoplayFailed(false); // Hide the prompt
    };

    // Mute/Unmute Audio
    const toggleAudio = async () => {
        if (localAudioTrack) {
            if (isAudioMuted) {
                await localAudioTrack.setEnabled(true);
            } else {
                await localAudioTrack.setEnabled(false);
            }
            setIsAudioMuted(!isAudioMuted);
        }
    };

    // Mute/Unmute Video
    const toggleVideo = async () => {
        if (localVideoTrack) {
            if (isVideoMuted) {
                await localVideoTrack.setEnabled(true);
                localVideoTrack.play('local-stream');
            } else {
                await localVideoTrack.setEnabled(false);
                const localStream = document.getElementById('local-stream');
                if (localStream) {
                    localStream.innerHTML = ''; // Clears the video feed
                }
            }
            setIsVideoMuted(!isVideoMuted);
        }
    };

    return (
        <div className="flex flex-col items-center p-4 space-y-4">
    <h2 className="text-2xl font-bold bg-white p-2 z-10">Live Class: {channelName}</h2>

    {role === 'host' ? (
      <div
        id="local-stream"
        className="w-full max-w-4xl aspect-[16/9] bg-black border-2 border-black"
      ></div>
    ) : (
      <div
        id="remote-streams"
        className="w-full  aspect-[16/9] bg-black border-2 border-black"
      ></div>
    )}
      {autoplayFailed && (
                <button
                    onClick={handleStartPlayback}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                    Start Playback
                </button>
            )}

    <div className="flex space-x-4">
      <button
        onClick={toggleAudio}
        className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded-lg"
      >
        {isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
      </button>

      <button
        onClick={toggleVideo}
        className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded-lg"
      >
        {isVideoMuted ? 'Turn On Camera' : 'Turn Off Camera'}
      </button>
    </div>
  </div>
    );
}
