import User from "@/models/User";

export async function handleAuthUser(profile, authMethod) {
  const existingUser = await User.findOne({ email: profile.email });

  if (existingUser) {
    await existingUser.linkAuthMethod(authMethod, {
      googleId: profile.googleId,
      image: profile.image,
      password: profile.password,
    });
    return existingUser;
  }

  const newUser = new User({
    name: profile.name,
    email: profile.email,
    image: profile.image,
    googleId: profile.googleId,
    password: profile.password,
    authMethods: [authMethod],
  });

  await newUser.save();
  return newUser;
}
