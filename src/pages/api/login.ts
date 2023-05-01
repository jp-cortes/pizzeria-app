import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req:NextApiRequest, res: NextApiResponse) {
if(req.method === "POST") {
    const { username, password } = req.body;

    if(
        username === process.env.ADMIN_USERNAME && 
        password === process.env.ADMIN_PASSWORD
    ) {
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", `${process.env.TOKEN}`, {
                maxAge: 60 * 60, // one hour 
                sameSite: "strict",
                path: "/",
            })
            );
            res.status(200).json("Succesfull"); 
        } else {
        res.status(400).json("Wrong Credentials"); 

    };
};
}