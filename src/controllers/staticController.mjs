import URLModel from "../models/index.mjs";

export async function handleHomePage(req, res) {
  try {
    const urls = await URLModel.find({userId:req.uid?._id}) ;

    return res.render("home", {
      urls: !urls ? [] : urls,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("<h1>Internal Server Error!</h1>");
  }
}
export function handleSignupPage(req, res) {
  return res.render("signup");
}
export function handleSigninPage(req, res) {
  return res.render("signin");
}
