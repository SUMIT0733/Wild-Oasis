import supabase, { supabaseUrl } from "./supabase.js";

export async function signUp({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName: fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getLoggedinUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;

  if (password) {
    updateData = { password };
  }
  if (fullName) {
    updateData = { data: { fullName } };
  }

  //1. update password or fullName
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;

  //2. upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storage_error } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storage_error) {
    throw new Error(storage_error.message);
  }

  //3. update avatar link to user
  // https://nfgqwtrhlvjzkxrvmcnk.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-02-29T19%3A01%3A00.325Z
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) {
    throw new Error(error2.message);
  }

  return updatedUser;
}
