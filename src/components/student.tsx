import  { useState } from "react";
import { ZoomMtg } from "@zoomus/websdk";

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.17.0/lib", "/av");
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const StudentJoin = () => {
    const [meetingNumber, setMeetingNumber] = useState("");
    const [password, setPassword] = useState("");

    const joinMeeting = () => {
        ZoomMtg.init({
            leaveUrl: "http://localhost:3000",
            success: () => {
                ZoomMtg.join({
                    meetingNumber,
                    userName: "Student",
                    signature: "YOUR_SIGNATURE",
                    sdkKey: "YOUR_ZOOM_SDK_KEY", // ✅ Use sdkKey instead of apiKey
                    passWord: password,
                    success: () => console.log("Joined Successfully"),
                    error: (err: any) => console.log(err),
                });
            },
        });
    };

    return (
        <div>
            <h1>Join a Meeting</h1>
            <input type="text" placeholder="Meeting ID" onChange={(e) => setMeetingNumber(e.target.value)} />
            <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={joinMeeting}>Join</button>
        </div>
    );
};

export default StudentJoin;
