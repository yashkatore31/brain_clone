import { UserMiddleware } from "./middleware";
import { JWT_PASSWORD } from "./config";
import { UserModel , ContentModel } from "./db";
import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
//post
app.post("/api/v1/signup", async (req, res) => {
  //zod validation
  const username = req.body.username;
  const password = req.body.password;
  try {
    await UserModel.create({
      username: username,
      password: password,
    }).then(() => {
      console.log("submitted");
    });
    res.json({
      message: "signed in",
    });
  } catch (e) {
    console.log("exits");

    res.status(411).json({
      message: "user exits",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const isUserExist = await UserModel.findOne({
    username,
    password,
  });

  if (isUserExist) {
    const token = jwt.sign(
      {
        id: isUserExist._id,
      },
      JWT_PASSWORD
    );

    res.json({
      token,
    });
  } else {
    res.status(403).json({
      msg: "user not exist",
    });
  }
});

app.post("/api/v1/content", UserMiddleware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;
  await ContentModel.create({
    link,
    type,
    //@ts-ignore
    userId: req.userId,
    tags: [],
  });

  res.json({
    msg: "content created",
  });
});

//get
app.get("/api/v1/content", async(req, res) => {
  const userId = req.userID;
  const content = await ContentModel.find({
    userId: userId
  }).populate("userId","username")
  res.json({
    content
  })
});

//delet
app.delete("/api/v1/content", (req, res) => {
  const contentId = req.body.contentId;

  await ContentModel.deleteMany({
    content,
    //@ts-ignore
    userId: req.userId
  })
  res.json({
    msg:"deleeted"
  })
});

//post
app.post("/api/v1/share", (req, res) => {});

//get
app.get("/api/v1/shareLink", (req, res) => {});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
