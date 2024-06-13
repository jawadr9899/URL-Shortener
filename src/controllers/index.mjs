import URLModel from "../models/index.mjs";
import UserModel from "../models/user.mjs";
import authService from "../services/auth.mjs";

export async function handleURL(req, res, next) {
  try {
    // already
    const url = new URL(req.body?.link.trim());
    const results = await URLModel.findOne({ userId:req.uid?._id,redirectURL: url});
    if(results) return res.redirect("/");

   

    const id = crypto.randomUUID().slice(0, 5);
    await URLModel.create({
      redirectURL: url,
      urlId: id,
      userId: req.uid?._id,
    });


    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).send("<h1>Invalid URL</h1><br><a href='/'>Back</a>");
  }
}
export async function handleURLOpen(req, res, next) {
  try {
    const id = req.params?.id;
    const link = await URLModel.findOne({ urlId: id });
    // check
    if (!link) return res.status(404).json({ success: false });

    await URLModel.findByIdAndUpdate(
      { _id: link._id },
      {
        $push: {
          history: [
            {
              clickedDate: new Date().getTime(),
            },
          ],
        },
        $inc: { clicks: 1 },
      }
    );

    return res.redirect(link?.redirectURL);
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
}
export async function handleClearURLs(req, res, next) {
  try {
    await URLModel.deleteMany({ userId: req.uid?._id });
    return res.json({ok:true})
  } catch (error) {
    console.log(`Error while clearing URLs\n${error}`);
    return res.status(500).send("<h1>Internal Server Error!</h1>");
  }
}

// Login
export async function handleSignup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("");
    }
    // duplication
    const duplicate = await UserModel.findOne({ name, email });
    if (duplicate)
      res
        .status(400)
        .send("<h1>User Already Exists!</h1><br><a href='/signup'>back</a>");

    // saving
    const id = await authService.signUp(name, email, password);
    if (!id) return res.redirect("/signup");

    return res.redirect("/signin");
  } catch (error) {
    console.log(`Error from Signup:\n ${error}`);
    return res.status(500).send("<h1>Internal Server Error</h1>");
  }
}

export async function handleSignin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send("<h1>Invalid Data</h1><br/><a href='/signup'>Back</a>");
  }
  // check
  const result = await authService.signIn(email, password);
  if (result instanceof Object) {
    return res.redirect("/signup");
  }

  // set cookie
  res.cookie("uid", result, {
    httpOnly: true,
    secure: true,
  });

  return res.redirect("/");
}
